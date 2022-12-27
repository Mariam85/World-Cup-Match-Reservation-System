const express = require('express');
const mongoose=require("mongoose")
var router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/usersSchema');
const Seats=require('../models/seatsSchema');
const auth = require('../middleware/auth');
const manager = require('../middleware/manager');
const Team=require('../models/teamsSchema');
const Stadium=require('../models/venuesSchema');
const Match=require('../models/matchesSchema');
const uuid = require('uuid');
const _ = require('lodash');
const { 
    v1: uuidv1,
    v4: uuidv4,
  } = require('uuid');

// Function to generate unique ticket numbers.
function ticketNum() {
    var date = Date.now();
    if (date <= ticketNum.previous) 
    {
        date = ++ticketNum.previous;
    } 
    else 
    {
        ticketNum.previous = date;
    }
    return date;
}  

// Creating a new match event.
//a team can not have two matches at the same day
router.post('/createMatch',[auth,manager],async(req,res)=>{
try{    
  // Checking that all the required body parameters are given.
  if(req.body.venue==null || req.body.mainReferee==null || req.body.dateAndTime==null || req.body.linesMen==null) 
  {
    return res.status(400).send("1 of the body parameters could not be read.");       
  }

  // Checking that the stadium chosen exists.
  var stadiumChosen= await Stadium.findOne({"name":req.body.venue});
  if(!stadiumChosen)
  {
    return res.status(400).send('The venue name entered does not exist.'); 
  }
  
  // Checking that the match being created does not exist.
  var matchExists=await Match.findOne({"linesMen":req.body.linesMen,"mainReferee":req.body.mainReferee,"dateAndTime":req.body.dateAndTime,"venue":stadiumChosen._id});
  if(matchExists)
  {
    return res.status(400).send('This match already exists.'); 
  }

  // Checking that no other match is on the same date in the same stadium. 
  var conflictingMatches= await Match.findOne({"venue":stadiumChosen._id,"dateAndTime":req.body.dateAndTime});
  if(conflictingMatches)
  {
    return res.status(400).send('A match in this venue at this time exists.');  
  }

  // Checking that only 2 teams are chosen.
  var teamsArray = req.body.teams;
  if(teamsArray.length != 2)
  {
    return res.status(400).send('More than 2 teams were picked.');
  }

  // Checking that the 2 teams chosen are not assigned to matches on the same date.
  for(m=0;m<2;m++)
  {
    // Checking that the teams exist.
    var result=await Team.find({name:teamsArray[m]});
    if(!result)
    {
        return res.status(400).send('One/All of the teams picked do not exist.'); 
    }
    if(result.length==0)
    {
        return res.status(400).send('One/All of the teams picked do not exist.');        
    }
    
    var matchesAssigned = result.matches;
    if(matchesAssigned)
    {
        if(matchesAssigned.length>0)
        {
            for(k=0;k<matchesAssigned.length;k++)
            {
                teamMatch= await Match.findById(matchesAssigned[k])
                if(teamMatch.dateAndTime == req.body.dateAndTime)
                {
                    return res.status(400).send('One of the teams is assigned to another match on the same date.');  
                }
            }
        }
    }
   }

  var numRows=stadiumChosen.numberOfRows;
  var numSeatsPerRow=stadiumChosen.seatsPerRow;
  var totalNumSeats= numRows*numSeatsPerRow;

  // Add match.
  var newMatch = new Match({
    linesMen: req.body.linesMen,
    mainReferee: req.body.mainReferee,
    venue: stadiumChosen._id,
    seats: [], 
    dateAndTime: req.body.dateAndTime 
  });
  await newMatch.save()
  .catch(error => {
    console.log(error);
    return res.status(400).send("Failed to save the match");
  })

  var matchID = mongoose.Types.ObjectId(newMatch._id);
  var seatsArray=[];
  // Add seats.
  for(j=0;j<totalNumSeats;j++)
  {
    var newSeat = new Seats({
                reserved:false,  
                seatNumber: j+1,
                ticketNumber:ticketNum(),
                match: matchID
                });    
    await newSeat.save()
    .catch(error => {
        console.log(error);
        return res.status(400).send("Failed to save seats.");
      })            
    seatsArray.push(newSeat._id);
  }

  // Add match to the matches booked for the stadium.
  const query = { name:  stadiumChosen.name};
  const updateDocument = {
      $push: { matchesBooked: matchID}
  };
  const updatedStadium = await Stadium.updateOne(query, updateDocument)
  .catch(error => {
    console.log(error);
    return res.status(400).send("Failed to add the match to the matches booked for the stadium");
  })

  // Add seats array to the match.
  var result = await Match.findByIdAndUpdate( matchID,{seats:seatsArray})            
  .catch(error => {
    console.log(error);
    return res.status(400).send("Failed to add the seats array to the match");
  })

  // Add the matchid to both teams.
  for(y=0;y<2;y++)
  {
    const query = { name:  teamsArray[y]};
    const updateDocument = {
        $push: { matches: matchID}
    };
    const result = await Team.updateOne(query, updateDocument)
    .catch(error => {
        console.log(error);
        return res.status(400).send("Failed to update the matches assigned to the team.");
      })
  }
  return res.status(200).send("Successfully added a new match.");
}
catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server error");
}

});

// Getting all the teams.
router.get('/teams',[auth,manager],async(req,res)=>{
    try{
        let projection={"_id":0,"name":1,"matches":0};
        var allTeams =await Team.find({}).select({"name":1,"_id":0});
        if(!allTeams)
        {
            return res.status(500).send("Internal Server error.");
        }
        else
        {
            if(allTeams.length>0)
            {
                return res.status(200).send(allTeams);
            }
            else
            {
                return res.status(404).send('No teams were found.');   
            }
        }
    }
    catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server error");
}
});

// Adding a new stadium.
router.post('/addStadium',[auth,manager],async(req,res)=>{
try{    
    if(req.body.stadium==null || req.body.seatsPerRow==null || req.body.numberOfRows==null) 
    {
        return res.status(400).send("1 of the body parameters could not be read.");       
    }

    // Checking that this stadium does not exist.
    console.log(req.body.stadium);
    var checkExistance = await Stadium.findOne({"name":req.body.stadium});
    if(!checkExistance)
    {
        // Adding the new stadium to the venues.    
        var newStadium = new Stadium({
            name:req.body.stadium,
            seatsPerRow: req.body.seatsPerRow,
            numberOfRows:req.body.numberOfRows,
            matchesBooked: [] 
        });
        await newStadium.save();
        return res.status(201).send("Successfully added a new stadium.");
    }
    else
    {
        return res.status(400).send("A stadium with this name already exists.");
    }
}
catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server error");
}
});

// Edit the details of an existing match.
router.put('/editMatch/:matchId',[auth,manager],async(req,res)=>{
try{
    var matchFound = await Match.findById(req.params.matchId);
    if(!matchFound)
    {
        return res.status(404).send("The match with this id is not found.");        
    }
    else
    {
        var mainReferee = req.body.mainReferee;
        var linesMen=req.body.linesMen;
        var venue = req.body.venue;
        var dateAndTime = req.body.dateAndTime;
        var teams=req.body.teams;

        // all the body parameters are null.
        if(mainReferee==null && linesMen==null && venue==null && dateAndTime==null && teams==null)
        {
            return res.status(400).send("No body parameter/parameters were given.");

        }                     
        var newMainReferee = (mainReferee) ? mainReferee : matchFound.mainReferee; 
        var newVenue=(venue) ? venue : matchFound.venue; 
        var newLinesMen=(linesMen) ? linesMen :matchFound.linesMen;
        var newDate=(dateAndTime) ? dateAndTime :matchFound.dateAndTime;
        if(linesMen)
        {
            if(linesMen.length !=2)
            {
                return res.status(400).send("Two linesmen should be picked.")   
            }
        }
        // Updating teams.
        if(teams)
        {
            if(teams.length!=2)
            {
                return res.status(400).send("Two teams should be picked.")
            }
            if(teams[0]==teams[1])
            {
                return res.status(400).send("Two different teams should be picked.") 
            }

            var teamOne = await Team.findOneAndUpdate({$expr: {$in: [req.params.matchId, "$matches"]}},{$pull:{matches: req.params.matchId}},{new:true})
            .catch(error => {
                console.log(error);
                return res.status(400).send("Failed to unassign the match from an old team.");
            })
            
            var teamTwo = await Team.findOneAndUpdate({$expr: {$in: [req.params.matchId, "$matches"]}},{$pull:{matches: req.params.matchId}},{new:true})
            .catch(error => {
                console.log(error);
                return res.status(400).send("Failed to unassign the match from an old team.");
            })

            // Checking that the 2 teams chosen are not assigned to matches on the same date.
            for(m=0;m<2;m++)
            { 
                var result=await Team.find({name:teams[m]});
                if(!result)
                {
                    return res.status(400).send('One/All of the teams picked do not exist.'); 
                }
                if(result.length==0)
                {
                    return res.status(400).send('One/All of the teams picked do not exist.');        
                }
                var matchesAssigned = result.matches;
                if(matchesAssigned)
                {
                    if(matchesAssigned.length>0)
                    {
                        for(k=0;k<matchesAssigned.length;k++)
                        {
                            teamMatch= await Match.findById(matchesAssigned[k])
                            if(teamMatch.dateAndTime == req.body.dateAndTime)
                            {
                                return res.status(400).send('One of the teams is assigned to another match on the same date.');  
                            }
                        }
                    }
                }
            }
            // Adding the match matchid to the teams matches.
            for(y=0;y<2;y++)
            {
                const query = { name:  teams[y]};
                const updateDocument = {
                    $push: { matches: req.params.matchId}
                };
                const result = await Team.updateOne(query, updateDocument)
                .catch(error => {
                    console.log(error);
                    return res.status(400).send("Failed to update the matches assigned to the team.");
                })
            }
        }

        // If the manager does not want to edit the venue return.
        if(req.body.venue==null)
        {
            var newMatchDetails= await Match.findByIdAndUpdate(
                req.params.matchId,{ $set:{'mainReferee':newMainReferee,'linesMen':newLinesMen,'dateAndTime':newDate}});
                return res.status(200).send("Successfully edited the match.");
        }
        
        // If the venue is being updated:
        // Update booked matches for the stadium.
        // Remove old seats and add new seats.

        var oldStadiumID=matchFound.venue; 

        // Removing the matchid from the booked matches for the old stadium.
        var oldStadium= await Stadium.findOneAndUpdate({_id:oldStadiumID},{$pull:{matchesBooked:req.params.matchId}},{new:true});
        
        // Adding the matchid to the matches booked for the new stadium.
        var newStadium= await Stadium.findOneAndUpdate({name: venue}, {$push: { matchesBooked: req.params.matchId}},{new:true})
        .catch(error => {
            console.log(error);
            return res.status(400).send("Failed to add the match to the matches booked for the stadium");
        })           

        // Adding new seats, and removing the old seats.
        var deleteSeats=await Seats.deleteMany({match: req.params.matchId});
        var totalNumSeats= newStadium.seatsPerRow * newStadium.numberOfRows;
        var seatsArray=[];
        for(j=0;j<totalNumSeats;j++)
        {
          var newSeat = new Seats({
                      reserved:false,  
                      seatNumber: j+1,
                      ticketNumber:ticketNum(),
                      match: req.params.matchId
                      });    
          await newSeat.save()
          .catch(error => {
              console.log(error);
              return res.status(400).send("Failed to save seats.");
            })            
          seatsArray.push(newSeat._id);
        }
        
        // Updating match details.
        var newMatchDetails= await Match.findOneAndUpdate(
                    {_id:req.params.matchId},
                    {"mainReferee":newMainReferee,"linesMen":newLinesMen,"dateAndTime":newDate,"seats":seatsArray,"venue":newStadium._id})
                    .catch(error => {
                        console.log(error);
                        return res.status(400).send("Failed to add the seats array to the match");
                    })            

        return res.status(200).send("Successfully edited the match.");            
    }    
}
catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server error");
}

});

// View a single match's details. 
router.get("/matchDetails/:matchId",[auth,manager],async(req,res)=>{
try{    
    if(!req.params.matchId )
    {
        return res.status(400).send("No match id was provided.");         
    }
    if(req.params.matchId==":matchId")
    {
        return res.status(400).send("No match id was provided.");  
    }
    var matchFound = await Match.findById(req.params.matchId);
    if(!matchFound)
    {
        return res.status(404).send("The match with this id is not found.");        
    }
    else
    {
        var venueName= await Stadium.findById(matchFound.venue);
        // return the teams that play in this match
        var matchID = mongoose.Types.ObjectId(matchFound._id);
        var teamNames=[];
        const cursor = await Team.find({
            $expr: {
              $in: [req.params.matchId, "$matches"]
            }
          }).limit(2).select({"name":1,"_id":0});

        teamNames.push(cursor[0].name);
        teamNames.push(cursor[1].name);
        //.toDateString()
        const Obj= ({
        "linesMen":matchFound.linesMen,
        "mainReferee":matchFound.mainReferee,
        "dateAndTime":matchFound.dateAndTime.toUTCString(),
        "stadium":venueName.name,   
        "teams":teamNames
        });
        return res.status(200).send(Obj);
    }
} 
catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server error");
}

});

// View all matches' details. 
router.get("/matchDetails",[auth,manager],async(req,res)=>{
    try{    
        var matchesFound = await Match.find({});
        if(!matchesFound)
        {
            return res.status(404).send("No matches found.");        
        }
        else
        {
            var allMatches=[]
            for(i=0;i<matchesFound.length;i++)
            {
                var venueName= await Stadium.findById(matchesFound[i].venue);
                // return the teams that play in this match
                var matchID = mongoose.Types.ObjectId(matchesFound[i]._id);
                var teamNames=[];
                const cursor = await Team.find({
                    $expr: {
                        $in: [matchesFound[i]._id, "$matches"]
                    }
                }).limit(2).select({"name":1,"_id":0});
    
                teamNames.push(cursor[0].name);
                teamNames.push(cursor[1].name);
                //.toDateString()
                const Obj= ({
                "linesMen":matchesFound[i].linesMen,
                "mainReferee":matchesFound[i].mainReferee,
                "dateAndTime":matchesFound[i].dateAndTime.toUTCString(),
                "stadium":venueName.name,   
                "teams":teamNames
                });
                allMatches.push(Obj)
            }
            return res.status(200).send(allMatches);
        }
    } 
    catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server error");
    }
    
});

//  View vacant/reserved seats for each match.
router.get('/viewSeats/:matchId',[auth,manager],async(req,res)=>{
try{
    if(!req.params.matchId )
    {
        return res.status(400).send("No match id was provided.");         
    }
    if(req.params.matchId==":matchId")
    {
        return res.status(400).send("No match id was provided.");  
    }    
    var matchFound = await Match.findById(req.params.matchId);
    if(!matchFound)
    {
        return res.status(404).send("The match with this id is not found.");        
    }
    else
    {
        var matchSeatsArray=[];
        var seatsIDs=matchFound.seats;
        for(i=0;i<seatsIDs.length;i++)
        {
            const seatsInfo= await Seats.findById(seatsIDs[i]).select({"seatNumber":1,"reserved":1,"_id":0});
            matchSeatsArray.push(seatsInfo);
        }
        return res.status(200).send(matchSeatsArray);
    }
}
catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server error");
}
});

// Getting all stadiums.
router.get('/stadiums',[auth,manager],async(req,res)=>{
    try{
        let projection={"_id":0,"name":1};
        var allStadiums =await Stadium.find({}).select(projection);
        if(!allStadiums)
        {
            return res.status(500).send("Internal Server error.");
        }
        else
        {
            if(allStadiums.length>0)
            {
                return res.status(200).send(allStadiums);
            }
            else
            {
                return res.status(404).send('No stadiums were found.');   
            }
        }
    }
    catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server error");
}
});

module.exports=router;
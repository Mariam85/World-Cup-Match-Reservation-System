import MatchItemFan from "./Match-Item/MatchItemFan";


const MatchFan = ({ matches }) => {
  return (
    <>
      {matches.map((match) => (
        <MatchItemFan
            key={match._id}
            Request={match}
            id={match._id}
        />
      ))}
    </>
  );
};

export default MatchFan;

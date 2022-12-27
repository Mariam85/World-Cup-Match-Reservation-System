import MatchItem from "./Match-Item/MatchItem";

const Match = ({ matches }) => {
  return (
    <>
      {matches.map((match) => (
        <MatchItem
            key={match.id}
            Request={match}
        />
      ))}
    </>
  );
};

export default Match;

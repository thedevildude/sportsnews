import React, { useEffect } from "react";
import { Match } from "../../context/livescore/types";
import { match } from "../../utils/api";
import { Link } from "react-router-dom";

const FavouriteNewsCard = (props: Match) => {
  const [story, setStory] = React.useState("");
  useEffect(() => {
    const fetchMatch = async () => {
      const response = await match(props.id);
      if (response.story) {
        setStory(response.story);
      }
    };
    fetchMatch();
  }, [props]);
  return (
    <Link
      className="block p-5 w-full border rounded-lg hover:shadow-lg transition duration-300"
      to={`/matches/${props.id}`}
    >
      <p className="text-md">{props.name}</p>
      <p className="text-xs text-gray-600 mt-2 truncate ...">{story}</p>
    </Link>
  );
};

export default FavouriteNewsCard;

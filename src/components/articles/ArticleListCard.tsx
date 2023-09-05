import React from "react";
import { Article } from "../../context/articles/types";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const ArticleListCard = (props: Article) => {
  return (
    <div
      key={props.id}
      className="p-4 border rounded-lg shadow-md hover:shadow-lg transition duration-300"
    >
      <Link to={`/articles/${props.id}`}>
        <div className="grid grid-cols-2">
          <div className="flex flex-col space-y-2">
            <h2 className="text-xl font-semibold">{props.title}</h2>
            <p className="text-gray-600">{props.summary}</p>
          </div>
          <div className="flex justify-end">
            <img
              className="object-cover w-32 h-20 rounded-lg"
              src={props.thumbnail}
              alt={props.title}
            />
          </div>
        </div>
        <div className="flex mt-4 space-x-1 text-sm text-gray-600">
          <p>{format(new Date(props.date), "yyyy-MM-dd HH:mm:ss")}</p>
          <span className="mx-1" aria-hidden="true">
            &middot;
          </span>
          <span>{props.sport.name}</span>
        </div>
      </Link>
    </div>
  );
};

export default ArticleListCard;

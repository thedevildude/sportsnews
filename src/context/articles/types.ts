import { Team } from "../livescore/types";

export interface ArticleListState {
  articles: Article[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export interface Article {
  id: number;
  title: string;
  thumbnail: string;
  sport: Sport;
  date: string;
  summary: string;
  content?: string;
  teams: Team[] | [];
}

export type Sport = {
  id: number;
  name: string;
}

export enum ArticleListActionTypes {
  FETCH_ARTICLES_REQUEST = "FETCH_ARTICLES_REQUEST",
  FETCH_ARTICLES_SUCCESS = "FETCH_ARTICLES_SUCCESS",
  FETCH_ARTICLES_FAILURE = "FETCH_ARTICLES_FAILURE",
}

export type ArticleListAction = 
  | { type: ArticleListActionTypes.FETCH_ARTICLES_REQUEST }
  | { type: ArticleListActionTypes.FETCH_ARTICLES_SUCCESS; payload: Article[] }
  | { type: ArticleListActionTypes.FETCH_ARTICLES_FAILURE; payload: string };

export type ArticleListDispatch = React.Dispatch<ArticleListAction>;
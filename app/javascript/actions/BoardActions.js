import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

export function fetchBoardRequest() {
  return { type: types.FETCH_BOARD_REQUEST };
}

export function fetchBoardsRequest() {
  return { type: types.FETCH_BOARDS_REQUEST };
}

export function fetchBoardSuccess(board) {
  return {
    type: types.FETCH_BOARD_SUCCESS,
    payload: {
      board
    }
  };
}

export function fetchBoardsSuccess(boards) {
  return {
    type: types.FETCH_BOARDS_SUCCESS,
    payload: {
      boards
    }
  };
}

export function createBoardRequest() {
  return { type: types.CREATE_BOARD_REQUEST };
}

export function createBoardSuccess(board) {
  return {
    type: types.CREATE_BOARD_SUCCESS,
    payload: {
      board
    }
  };
}

export function fetchBoards() {
  return function(dispatch) {
    dispatch(fetchBoardsRequest());
    apiClient.getBoards(boards => dispatch(fetchBoardsSuccess(boards)));
  };
}

export function fetchBoard(boardId) {
  return function(dispatch) {
    dispatch(fetchBoardRequest());
    apiClient.getBoard(boardId, board => dispatch(fetchBoardSuccess(board)));
  };
}

export function createBoard(board, callback) {
  return function(dispatch) {
    dispatch(createBoardRequest());
    apiClient.createBoard(board, newBoard => {
      dispatch(createBoardSuccess(newBoard));

      if (callback) {
        callback(newBoard);
      }
    });
  };
}

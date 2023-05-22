import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import {v1 as uuid} from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';
@Injectable()
export class BoardsService {
    private boards: Board[] = [];

    /**
     * boards 배열에 들어있는 모든 값을 리턴 
     * getAllBoards() 라는 메서드가 리턴되는 값을 다음과 같이 지정 할 수 있음.
     * */ 
    getAllBoards(): Board[] {
        return this.boards;
    }

    /**
     * 게시물을 생성하는 service의 생성 메서드 정의.
    */
   createBoard(CreateBoardDto: CreateBoardDto) {
    //title, description을 기반으로 게시물을 생성하고, default stauts 는 Public으로 선정 
    const {title, description} = CreateBoardDto; // DTO에 정의된 title, description 부분을 구조 분해 할당으로 한 번에 정의.
    const board: Board = {
        id:uuid(), // 아직 별도로 db를 연결하지 않았기에, 게시글의 고유값을 부여할 때 uuid 모듈을 기반으로 정의 
        title,
        description,
        status: BoardStatus.PUBLIC
    }
    // 새롭게 들어온 board 객체를 맨상단에 정의한 boards 배열의 인자값으로 넣어주고 리턴.
    this.boards.push(board);
    return board;
   }

   // id 값을 기반으로 특정 게시물을 조회하는 serivce
   getBoardById(id: string): Board {
    return this.boards.find((board) => board.id === id);
   }

   // id 값을 기반으로 특정 게시물을 삭제하는 service 
    deleteBoard(id: string): void {
     this.boards = this.boards.filter((board) => board.id !== id); // boards 배열에 들어있는 board 객체의 id 값이 일치하지 않은 애들은 놔두고, 일치하는 요소만 삭제
   }

   /**
    * 특정 게시물 업데이트 하는 service 
    * @params id => 업데이트 하고자 하는 게시물 id 값 
    * @params status => 업데이트 하고자 하는 상태값 => boards-model에서 정의한 status 의 enum 객체 값인 public, private 값 두개 중 하나를 기반으로 가져옴. 
    * */ 
   updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id); // 위에서 정의한 게시물 조회 메서드를 사용해서, 넘겨받은 id 값을 기반으로 조회 
    board.status = status;
    return board;
   } 
}

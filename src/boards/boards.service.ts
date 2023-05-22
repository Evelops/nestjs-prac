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
}

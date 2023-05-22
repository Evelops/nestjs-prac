import { Injectable } from '@nestjs/common';
import { Board } from './board.model';

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
     
}

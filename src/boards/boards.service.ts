import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardsService {
    private boards = ['test1','test2'];

    // boards 배열에 들어있는 모든 값을 리턴 
    getAllBoards() {
        return this.boards;
    }
     
}

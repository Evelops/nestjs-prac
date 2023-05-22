import { Controller, Get } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.model';
@Controller('boards')
export class BoardsController {
    // controller에 대해서 서비스에 대한 di 주입을 해주어야함. 
    constructor(private boardsService: BoardsService) {}

    // 모든 게시물에 대한 핸들러를 가져오는 GET 메서드 
    @Get('/')
    getAllBoard(): Board[]{
        return this.boardsService.getAllBoards();
    }
}
import { Body, Controller, Get, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';
@Controller('boards')
export class BoardsController {
    // controller에 대해서 서비스에 대한 di 주입을 해주어야함. 
    constructor(private boardsService: BoardsService) {}

    // 모든 게시물에 대한 핸들러를 가져오는 GET 메서드 
    @Get('/')
    getAllBoard(): Board[]{
        return this.boardsService.getAllBoards();
    }
    
    /**
     * 게시물 생성 부분으로 요청이 들어왔을 때, 게시물 생성 서비스 정의 
     * express => req, res 형식으로 받았다면 nest에선 @Body 데코레이션으로 
     * client에서 요청한 로직을 받아서 처리함.
     * client에서 보내는 값이 단 하나(title || description) 이라면 @Body('title') title or @Body('description') description으로 받는다. 
     * */ 
    @Post()
    createBoard(
        @Body() CreateBoardDto: CreateBoardDto
        ): Board {
            return this.boardsService.createBoard(CreateBoardDto);
        }
}
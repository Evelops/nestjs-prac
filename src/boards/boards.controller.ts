import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validations.pipe';
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
     * nest 프레임워크 내부 built-in-pipes중 하나인 인증 파이프를 게시물 생성시 정의 
     * */ 
    @Post()
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() CreateBoardDto: CreateBoardDto
        ): Board {
            return this.boardsService.createBoard(CreateBoardDto);
        }
    
    /**
     * 게시물의 id 값을 기반으로 특정 게시물을 찾기 위한 컨트롤러
     * post 형식에서 데이터를 받아올 때는, body, header에 담아서 가져오나 Get 요청은 @param 어노테이션으로 쿼리스트링을 받아옴.
    */
    @Get('/:id')
    getBoardById(@Param('id') id: string): Board {
        return this.boardsService.getBoardById(id);
    }

    /**
     * 특정 id를 가지는 board를 지우기 위한 controller
    */
   @Delete("/:id")
   delBoardById(@Param('id') id: string): void{
    this.boardsService.deleteBoard(id);
   }

   /**
    * 특정 id를 가지는 board의 상태 값을 업데이트 하기 위한 contorller  
    * id 값은 @params으로 받아오고, status는 @Body에 담아서 가져옴.
    * status 상태에서 유효성 체크를 해야하기 때문에, 커스텀 pipe를 status에 추가하여 유효성 검증 
    */
   @Patch("/:id/status")
   updateBoardStatus(
    @Param('id') id: string,
    @Body('status',BoardStatusValidationPipe) status: BoardStatus,
   ) {
    return this.boardsService.updateBoardStatus(id,status);
   }
      
}
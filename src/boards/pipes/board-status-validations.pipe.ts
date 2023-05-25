import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../board-status.enum";

/**
 * 커스텀 파이프 생성. 
 * 커스텀 파이프 생성은 class 형식을 사용하며 PipeTransform을 별도로 implements 받아야함
 * 아래 커스텀 pipe의 기능은 public, private staus가 아닌 다른 값이 들어왔을 때, 유효성 체크를 해주는 역할을 담당하는 pipe
*/
export class BoardStatusValidationPipe implements PipeTransform {
    readonly StatusOptions = [
        BoardStatus.PRIVATE,
        BoardStatus.PUBLIC,
    ]
    
    transform(value: any) {
        value = value.toUpperCase(); // 들어온 status 값을 모두 대문자로 변경 
        // status 값이 -1일 경우, public, private 값과 일치하지 않기때문에 예외 발생 
        if(!this.isStatusValid(value)){
            throw new BadRequestException(`${value} isn't in the status.`);
        }

        return value;
    }

    // status status의 값이 -1이 아닐시 유효함. -> Public, Private 중 하나.
    private isStatusValid(status: any) {
        const index = this.StatusOptions.indexOf(status);
        return index !== -1;
    }
}
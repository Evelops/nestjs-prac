import { IsNotEmpty } from "class-validator";
export class CreateBoardDto {
    // dto 클래스로 들어오는 객체에 대해서 pipe를 적용시켜 값이 비어있는지 아닌지 자동으로 유효성 체크 
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
}
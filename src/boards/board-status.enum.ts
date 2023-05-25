/* enum 타입으로,게시판이 공개인지, 비공개인지를 정의
 * enum => 열거형 데이터 타입을 지원함, 값을 미리 정의 시켜두고 정의 시킨 내부의 값만을 
 * 사용하도록 정의한 타입을 말함.  
*/
export enum BoardStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE'
}
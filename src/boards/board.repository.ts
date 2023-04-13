import { CustomRepository } from "src/decorator/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { Board } from "./board.entity";

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {

}

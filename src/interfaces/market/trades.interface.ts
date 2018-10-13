import { CommonPaging } from '../common/paging.interface';
import { CommonResponseV2 } from '../common/responseV2.interface';

export interface Trades extends CommonResponseV2 {
  trades: Trade[];
  paging: CommonPaging;
}

interface Trade {
  id: number;
  price: number;
  volume: number;
  creationTime: number;
}
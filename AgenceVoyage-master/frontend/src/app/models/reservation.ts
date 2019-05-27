import { Flight } from './flight';
import { Hotel } from './hotel';
import { MoyenT } from './moyen-t';
import { User } from './user';
export class Reservation {
  id: Number
  duration: Number
  flight: Flight
  hotel: Hotel
  personsCount: Number
  startingDate: Date
  transport: MoyenT
  user: User

}

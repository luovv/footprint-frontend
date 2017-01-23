
import {Image} from "./image";

export class Album {
  constructor(public albumId, public userId, public name, public description, public geo, public images:Image[], public username){}
}

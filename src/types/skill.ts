import User from "./user";

interface Skill {
  _id: string;
  name: string;
  percent: number;
  user: User;
  __v: 0;
}

export default Skill;

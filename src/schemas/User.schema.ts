import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ unique: true })
  username: string;

  @Prop()
  displayName: string;

  @Prop()
  passwordHash: string;

  @Prop({ required: false })
  avatarUrl?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

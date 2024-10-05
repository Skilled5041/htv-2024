import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Post {
  'title' : string,
  'creator' : string,
  'description' : string,
  'likes' : bigint,
  'funding_amount' : bigint,
  'images' : Array<Uint8Array | number[]>,
}
export interface _SERVICE {
  'createPost' : ActorMethod<
    [Array<Uint8Array | number[]>, string, string, string],
    undefined
  >,
  'getAllPosts' : ActorMethod<[], Array<Post>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];

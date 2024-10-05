export const idlFactory = ({ IDL }) => {
  const Post = IDL.Record({
    'title' : IDL.Text,
    'creator' : IDL.Text,
    'description' : IDL.Text,
    'likes' : IDL.Nat,
    'funding_amount' : IDL.Nat,
    'images' : IDL.Vec(IDL.Vec(IDL.Nat8)),
  });
  return IDL.Service({
    'createPost' : IDL.Func(
        [IDL.Vec(IDL.Vec(IDL.Nat8)), IDL.Text, IDL.Text, IDL.Text],
        [],
        [],
      ),
    'getAllPosts' : IDL.Func([], [IDL.Vec(Post)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };

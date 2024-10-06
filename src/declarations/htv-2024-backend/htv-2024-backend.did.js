export const idlFactory = ({ IDL }) => {
  const PostSnapshot = IDL.Record({
    'id' : IDL.Nat,
    'title' : IDL.Text,
    'creator' : IDL.Text,
    'description' : IDL.Text,
    'likes' : IDL.Nat,
    'funding_amount' : IDL.Nat,
    'ltc_wallet' : IDL.Text,
    'images' : IDL.Vec(IDL.Vec(IDL.Nat8)),
  });
  return IDL.Service({
    'createPost' : IDL.Func(
        [IDL.Vec(IDL.Vec(IDL.Nat8)), IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [],
        [],
      ),
    'editPost' : IDL.Func(
        [IDL.Nat, IDL.Opt(IDL.Text), IDL.Opt(IDL.Text)],
        [],
        [],
      ),
    'getAllPostSnapshots' : IDL.Func([], [IDL.Vec(PostSnapshot)], ['query']),
    'getPostSnapshot' : IDL.Func([IDL.Nat], [PostSnapshot], ['query']),
    'likePost' : IDL.Func([IDL.Nat], [], []),
    'unlikePost' : IDL.Func([IDL.Nat], [], []),
  });
};
export const init = ({ IDL }) => { return []; };

import Array "mo:base/Array";
actor {
    stable var postList : [Post] = [];

    type Post = {
        images : [Blob];
        title : Text;
        description : Text;
        funding_amount : Nat;
        creator : Text;
        likes : Nat;
    };

    public func createPost(images : [Blob], title : Text, description : Text, creator : Text) : async () {
        let post : Post = {
            title = title;
            images = images;
            description = description;
            creator = creator;
            funding_amount = 0;
            likes = 0;
        };
        postList := Array.append<Post>(postList, [post]);
    };

    public query func getAllPosts() : async [Post] {
        return postList;
    };
};

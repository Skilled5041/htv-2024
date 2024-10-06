import Array "mo:base/Array";
import Blob "mo:base/Blob";
import Text "mo:base/Text";
import Nat "mo:base/Nat";

actor {
    stable var postList : [Post] = [];

    type Post = {
        id: Nat;
        images : [Blob];
        var title : Text;
        var description : Text;
        creator : Text;
        var funding_amount : Nat;
        var likes : Nat;
    };


    type PostSnapshot = {
        id: Nat;
        images : [Blob];
        title : Text;
        description : Text;
        creator : Text;
        funding_amount : Nat;
        likes : Nat;
    };

    public func createPost(images : [Blob], title : Text, description : Text, creator : Text) : async () {
        let post : Post = {
            id = postList.size();
            var title = title;
            images = images;
            var description = description;
            creator = creator;
            var funding_amount = 0;
            var likes = 0;
        };
        postList := Array.append<Post>(postList, [post]);
    };

    // temp here
    // public func fundPost(postId : Nat, amount : Nat) : async () {
    //     if (postId < Array.size<Post>(postList)) {  
    //         let post = postList[postId];
    //         post.funding_amount += amount; 
    //     }
    // };


    public func likePost(postId : Nat) : async () {
        if (postId < Array.size<Post>(postList)) {  
            let post = postList[postId];
            post.likes += 1; 
        }
    };

    public func editPost(postId : Nat, title : ?Text, description : ?Text) : async () {
        if (postId < Array.size<Post>(postList)) {  
        // Fetch the post from the list
        let post = postList[postId];

        switch title {
            case (?newTitle) {
                post.title := newTitle;
            };
            case null { 

            };
        };

        switch description {
            case (?newDescription) {
                post.description := newDescription;
            };
            case null { 
                
            };
        };
    }
    };


    public query func getPostSnapshot (postId: Nat) : async PostSnapshot {
        let post : Post = postList[postId];
        let postSnapshot : PostSnapshot = {
            id = post.id;
            title = post.title;
            images = post.images;
            description = post.description;
            creator = post.creator;
            funding_amount = post.funding_amount;
            likes = post.likes;
        };
        return postSnapshot;
    };


    public query func getAllPostSnapshots() : async [PostSnapshot] {
        // convert Post to PostSnapshot
        let postSnapshots : [PostSnapshot] = Array.map<Post, PostSnapshot>(postList, func (post : Post) : PostSnapshot {
            {
                id = post.id;
                title = post.title;
                images = post.images;
                description = post.description;
                creator = post.creator;
                funding_amount = post.funding_amount;
                likes = post.likes;
            }
        });
        return postSnapshots;
    };
};

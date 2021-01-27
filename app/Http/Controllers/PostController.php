<?php

namespace App\Http\Controllers;

use App\Events\NewInstruction;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Validator;

class PostController extends BaseController
{
    public function index()
    {
        $org_id = auth()->user()->id;
        $posts = Post::where('user_id', $org_id)->get();
        if (is_null($posts)) {
            return $this->sendError("Couldn't find posts", ['error' => 'No posts found']);
        }
        return $this->sendResponse($posts, 'Posts retrieved successfully.');
    }
    public function getAllInstructionForManager()
    {
        $user_id = auth()->user()->id;
        $query = "SELECT organization_id
                FROM roles
                INNER JOIN users  on users.id = roles.user_id
                where  roles.user_id =$user_id
                ";
        $org_id = DB::Select($query);
        $posts = Post::where('user_id', $org_id[0]->organization_id)->get();
        if (is_null($posts)) {
            return $this->sendError("Couldn't find posts", ['error' => 'No posts found']);
        }
        return $this->sendResponse($posts, 'Posts retrieved successfully.');
    }
    public function store(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'title' => 'required',
            'body' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $user_id = auth()->user()->id;
        $createPost = ['title' => $input['title'],
            'body' => $input['body'],
            'user_id' => $user_id,
        ];
        $post = new Post($createPost);
        $post->save();
        event(new NewInstruction($post));
        return $this->sendResponse($post, 'Post created successfully.');
    }
    public function edit($id){
        $post=Post::find($id);
        return $post;
    }
    public function update(Request $request,$id){
        $post=Post::find($id);
        $post->title=$request->title;
        $post->body=$request->body;
        $post->save();
    }
    public function destroy($post_id)
    {
        $post = Post::find($post_id);
        $post->delete();
        return $this->sendResponse($post, 'Post deleted successfully.');
    }
}

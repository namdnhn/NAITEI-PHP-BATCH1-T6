<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    // Get all comments
    public function index()
    {
        $comments = Comment::all();
        return response()->json($comments);
    }

    // Get a single comment
    public function show($id)
    {
        $comment = Comment::find($id);
        if ($comment) {
            return response()->json($comment);
        } else {
            return response()->json(['message' => 'Comment not found'], 404);
        }
    }

    // Create a new comment
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'product_id' => 'required|exists:products,id',
            'comment' => 'required|string',
        ]);

        $comment = Comment::create($validatedData);
        return response()->json($comment, 201);
    }

    // Update an existing comment
    public function update(Request $request, $id)
    {
        $comment = Comment::find($id);
        if ($comment) {
            $validatedData = $request->validate([
                'user_id' => 'sometimes|required|exists:users,id',
                'product_id' => 'sometimes|required|exists:products,id',
                'comment' => 'sometimes|required|string',
            ]);

            $comment->update($validatedData);
            return response()->json($comment);
        } else {
            return response()->json(['message' => 'Comment not found'], 404);
        }
    }

    // Delete a comment
    public function destroy($id)
    {
        $comment = Comment::find($id);
        if ($comment) {
            $comment->delete();
            return response()->json(['message' => 'Comment deleted successfully']);
        } else {
            return response()->json(['message' => 'Comment not found'], 404);
        }
    }
}

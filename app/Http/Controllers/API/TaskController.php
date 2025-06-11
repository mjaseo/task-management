<?php

namespace App\Http\Controllers\API;

use App\Models\Task;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class TaskController extends Controller
{
    public function index()
    {
        //return Task::with('user')->latest()->get();
        return Task::with('user')
            ->where('user_id', Auth::id())
            ->latest()
            ->get();
    }

    public function store(Request $request)
    {
        $fields = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'in:to_do,in_progress,done',
            'due_date' => 'nullable|date',
            'user_id' => 'required|exists:users,id',
            'attachment' => 'nullable|file|max:5120', // 5MB
        ]);

        if ($request->hasFile('attachment')) {
            $fields['attachment'] = $request->file('attachment')->store('attachments');
        }

        $task = Task::create($fields);
        return response()->json($task, 201);
    }

    public function show(Task $task)
    {
        return $task;
    }

    public function update(Request $request, Task $task)
    {
        $fields = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'status' => 'in:to_do,in_progress,done',
            'due_date' => 'nullable|date',
            'user_id' => 'sometimes|exists:users,id',
            'attachment' => 'nullable|file|max:5120',
        ]);

        if ($request->hasFile('attachment')) {
            // Delete old file if exists
            if ($task->attachment) {
                Storage::delete($task->attachment);
            }

            $fields['attachment'] = $request->file('attachment')->store('attachments');
        }

        $task->update($fields);
        return response()->json($task);
    }

    public function destroy(Task $task)
    {
        if ($task->attachment) {
            Storage::delete($task->attachment);
        }

        $task->delete();
        return response()->json(['message' => 'Task deleted']);
    }
}


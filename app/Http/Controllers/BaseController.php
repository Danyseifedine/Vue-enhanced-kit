<?php

namespace App\Http\Controllers;

use App\Traits\HasDataTable;
use Illuminate\Http\Request;

class BaseController extends Controller
{
    use HasDataTable;

    public function successWithToast(string $message, string $title = 'Success')
    {
        return redirect()->back()->with([
            'success' => true,
            'toast' => [
                'type' => 'success',
                'title' => $title,
                'message' => $message
            ]
        ]);
    }

    public function errorWithToast(string $message, string $title = 'Error')
    {
        return redirect()->back()->with([
            'success' => false,
            'toast' => [
                'type' => 'error',
                'title' => $title,
                'message' => $message
            ]
        ]);
    }
}

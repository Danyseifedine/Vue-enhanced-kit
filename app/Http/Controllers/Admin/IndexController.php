<?php

namespace App\Http\Controllers\Admin;

use App\Navigation\AdminPath;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IndexController extends Controller
{
    public function index()
    {
        return Inertia::render(AdminPath::view("Index"));
    }

    public function appearance()
    {
        return Inertia::render(AdminPath::view("settings/Appearance"));
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Navigation\AdminPath;
use App\Http\Controllers\Controller;
use Inertia\Inertia;

class IndexController extends Controller
{

    public function __construct()
    {
        $this->middleware('permission:access-super-admin-dashboard')->only('index');
    }

    public function index()
    {
        return Inertia::render(AdminPath::view("Index"));
    }

    public function appearance()
    {
        return Inertia::render(AdminPath::view("settings/Appearance"));
    }
}

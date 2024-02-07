<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCustomerRequest;
use App\Models\Customer;
use Illuminate\Http\JsonResponse;

class CustomerController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'customers' => Customer::all(),
        ]);
    }

    public function store(CreateCustomerRequest $request): JsonResponse
    {
        $customer = Customer::create($request->validated());

        return response()->json([
            'customer' => $customer,
            201
        ]);
    }

    public function show(Customer $customer): JsonResponse
    {
        return response()->json([
            'customer' => $customer,
        ]);
    }
}

from django.shortcuts import render, Http404, redirect

dealers_list = [
    {"id": 1, "name": "Best Cars NYC", "city": "New York", "state": "NY", "address": "123 Main St", "zip": "10001"},
    {"id": 2, "name": "Austin Auto Hub", "city": "Austin", "state": "TX", "address": "456 Oak Rd", "zip": "73301"},
    {"id": 3, "name": "Chicago Motor Group", "city": "Chicago", "state": "IL", "address": "789 Lakefront Dr", "zip": "60601"},
    {"id": 4, "name": "Wichita Auto Center", "city": "Wichita", "state": "Kansas", "address": "555 Sunflower Rd", "zip": "67201"},
]

reviews_list = {
    1: [
        {"id": 101, "name": "John Doe", "review": "Great experience buying my vehicle here!", "car": "Toyota Camry 2022", "sentiment": "positive"},
        {"id": 102, "name": "Jane Smith", "review": "Service was okay, but wait time was long.", "car": "Honda Civic 2021", "sentiment": "neutral"}
    ]
}

def get_dealerships(request):
    dealers = dealers_list
    selected_state = request.GET.get('state')
    if selected_state and selected_state != 'All':
        dealers = [d for d in dealers if d['state'].lower() == selected_state.lower()]
        
    return render(request, 'djangoapp/index.html', {
        'dealers': dealers, 
        'selected_state': selected_state or 'All'
    })

def get_dealer_details(request, dealer_id):
    dealer = next((d for d in dealers_list if d['id'] == dealer_id), None)
    if not dealer:
        raise Http404("Dealer not found")
        
    reviews = reviews_list.get(dealer_id, [])
    return render(request, 'djangoapp/dealer_details.html', {
        'dealer': dealer,
        'reviews': reviews
    })

def add_review(request, dealer_id):
    dealer = next((d for d in dealers_list if d['id'] == dealer_id), None)
    if not dealer:
        raise Http404("Dealer not found")

    if request.method == 'POST':
        content = request.POST.get('content', '')
        car = request.POST.get('car', 'N/A')
        username = request.user.username if request.user.is_authenticated else "Anonymous"
        
        new_review = {
            "id": len(reviews_list.get(dealer_id, [])) + 100,
            "name": username,
            "review": content,
            "car": car,
            "sentiment": "positive"
        }
        
        if dealer_id not in reviews_list:
            reviews_list[dealer_id] = []
        reviews_list[dealer_id].append(new_review)
        
        return redirect('dealer_details', dealer_id=dealer_id)

    return render(request, 'djangoapp/add_review.html', {'dealer': dealer})

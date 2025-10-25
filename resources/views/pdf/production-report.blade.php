<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Production Report</title>
    <style>
        body { font-family: sans-serif; font-size: 12px; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th, td { border: 1px solid #ddd; padding: 6px; text-align: left; }
        th { background: #f3f3f3; }
        h2 { text-align: center; margin-bottom: 5px; }
        .summary { margin-top: 10px; }
    </style>
</head>
<body>
    <h2>Production Report ({{ $period }})</h2>
    <p>Period: {{ $startDate }} - {{ $endDate }}</p>

    <div class="summary">
        <p><strong>Total Orders:</strong> {{ $summary['total_orders'] }}</p>
        <p><strong>Completed:</strong> {{ $summary['completed'] }}</p>
        <p><strong>Total Production:</strong> {{ $summary['total_production'] }}</p>
        <p><strong>Total Rejected:</strong> {{ $summary['total_rejected'] }}</p>
    </div>

    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Product</th>
                <th>Planned</th>
                <th>Actual</th>
                <th>Rejected</th>
                <th>Completed</th>
                <th>Progress</th>
            </tr>
        </thead>
        <tbody>
            @foreach($byProduct as $index => $item)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>{{ $item['product_name'] }} ({{ $item['product_code'] }})</td>
                    <td>{{ $item['total_planned'] }}</td>
                    <td>{{ $item['total_actual'] }}</td>
                    <td>{{ $item['total_rejected'] }}</td>
                    <td>{{ $item['completed'] }}</td>
                    <td>{{ $item['progress'] }}%</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>
</html>

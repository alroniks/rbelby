import json

path = '/Users/alroniks/dev/alr/freetime/rbelby/design/ui.pen'

with open(path, 'r') as f:
    data = json.load(f)

count = 0

def fix_widths_and_layouts(node):
    global count
    if isinstance(node, dict):
        name = node.get('name')
        node_id = node.get('id')
        node_type = node.get('type')
        
        # 1. Ensure regCard and liveStatsCard have width: "fill_container"
        if name in ["regCard", "liveStatsCard"] and node_type == "frame":
            print(f"Setting fill_container width on {name} ({node_id})")
            node['width'] = 'fill_container'
            count += 1
            
        # 2. Fix the warning 'i5r6kp' (Logo / comp_Logo or similar) having fit_content sizing but no layout
        if node_id == 'i5r6kp' and node_type == "frame" and 'layout' not in node:
            print("Enabling layout on i5r6kp")
            node['layout'] = 'horizontal'
            count += 1
            
        for k, v in node.items():
            fix_widths_and_layouts(v)
            
    elif isinstance(node, list):
        for item in node:
            fix_widths_and_layouts(item)

fix_widths_and_layouts(data)

with open(path, 'w') as f:
    json.dump(data, f, indent=2)

print(f"Fixed {count} layout warning nodes successfully!")

import xml.etree.ElementTree as ET
import re
import shutil

tree = ET.parse('/Users/max/Projects/inteist.com/inteist.com.main/public/img/projects/rustacean-walking.svg.bak')
root = tree.getroot()
ns = {'svg': 'http://www.w3.org/2000/svg'}
ET.register_namespace('', 'http://www.w3.org/2000/svg')
ET.register_namespace('xlink', 'http://www.w3.org/1999/xlink')
ET.register_namespace('serif', 'http://www.serif.com/')

# Change viewBox to prevent clipping
root.set('viewBox', '-150 -150 1500 1100')

g_main = None
for g in root.findall('.//svg:g', ns):
    p = g.find('svg:path', ns)
    if p is not None and 'url(#_Linear1)' in p.get('style', ''):
        g_main = g
        break

d = g_main.find('svg:path', ns).get('d')

match = re.search(r'(0\.518,0\.603[LcC].*?)(C0\.406,0\.575\s*0\.091,0\.024\s*0\.305,-0\.531)', d)
left_leg_full = match.group(1).replace('0.518,0.603', '')
belly_curve = match.group(2)

match2 = re.search(belly_curve.replace('+', '\\+') + r'(.*?)(L0\.402,-0\.615)', d)
right_leg_full = match2.group(1)

# Modify main body shape
new_d = d.replace(left_leg_full, "L0.406,0.575 ").replace(right_leg_full, "")
g_main.find('svg:path', ns).set('d', new_d)

transform = g_main.get('transform')
style = g_main.find('svg:path', ns).get('style')

layer1 = root.find('.//svg:g[@id="Layer-1"]', ns)

# Create Outer Front Left Leg with flap pointing to local (0.454, 0.387), which is center/right inside body
g_left = ET.Element('g', {'id': 'outer-front-leg-left'})
g_left_inner = ET.Element('g', {'transform': transform})
p_left = ET.Element('path', {
    'd': f"M0.518,0.603 {left_leg_full.strip()} L0.454,0.387 Z",
    'style': style
})
g_left_inner.append(p_left)
g_left.append(g_left_inner)

# Create Outer Front Right Leg with flap pointing to local (0.385, -0.403), which is center/left inside body
g_right = ET.Element('g', {'id': 'outer-front-leg-right'})
g_right_inner = ET.Element('g', {'transform': transform})
p_right = ET.Element('path', {
    'd': f"M0.305,-0.531 {right_leg_full.strip()} L0.402,-0.615 L0.385,-0.403 Z",
    'style': style
})
g_right_inner.append(p_right)
g_right.append(g_right_inner)

idx = list(layer1).index(g_main)
layer1.insert(idx, g_left)
layer1.insert(idx, g_right)

style_elem = root.find('.//svg:style', ns)
new_css = '''
    /* Professional Crab Animation */
    @keyframes scurry-leg-left-front {
        0%   { transform: rotate(0deg); }
        25%  { transform: rotate(5deg); }
        50%  { transform: rotate(0deg); }
        75%  { transform: rotate(-3deg); }
        100% { transform: rotate(0deg); }
    }
    @keyframes scurry-leg-right-front {
        0%   { transform: rotate(0deg); }
        25%  { transform: rotate(-3deg); }
        50%  { transform: rotate(0deg); }
        75%  { transform: rotate(5deg); }
        100% { transform: rotate(0deg); }
    }
    @keyframes scurry-leg-left-back {
        0%   { transform: rotate(0deg); }
        25%  { transform: rotate(-15deg); }
        50%  { transform: rotate(0deg); }
        75%  { transform: rotate(20deg); }
        100% { transform: rotate(0deg); }
    }
    @keyframes scurry-leg-right-back {
        0%   { transform: rotate(0deg); }
        25%  { transform: rotate(20deg); }
        50%  { transform: rotate(0deg); }
        75%  { transform: rotate(-15deg); }
        100% { transform: rotate(0deg); }
    }
    
    #front-leg-left {
        animation: scurry-leg-left-front 0.8s cubic-bezier(0.4, 0.0, 0.6, 1) infinite;
        transform-origin: 300px 750px;
    }
    #front-leg-right {
        animation: scurry-leg-right-front 0.8s cubic-bezier(0.4, 0.0, 0.6, 1) infinite;
        transform-origin: 900px 750px;
    }
    #back-leg-left {
        animation: scurry-leg-left-back 0.4s cubic-bezier(0.4, 0.0, 0.6, 1) infinite;
        transform-origin: 200px 590px;
    }
    #back-leg-right {
        animation: scurry-leg-right-back 0.4s cubic-bezier(0.4, 0.0, 0.6, 1) infinite;
        transform-origin: 1000px 575px;
    }

    @keyframes scurry-outer-leg-left {
        0%   { transform: scale(1.25) rotate(0deg); }
        25%  { transform: scale(1.25) rotate(5deg); }
        50%  { transform: scale(1.25) rotate(0deg); }
        75%  { transform: scale(1.25) rotate(-10deg); }
        100% { transform: scale(1.25) rotate(0deg); }
    }
    @keyframes scurry-outer-leg-right {
        0%   { transform: scale(1.25) rotate(0deg); }
        25%  { transform: scale(1.25) rotate(-5deg); }
        50%  { transform: scale(1.25) rotate(0deg); }
        75%  { transform: scale(1.25) rotate(10deg); }
        100% { transform: scale(1.25) rotate(0deg); }
    }
    #outer-front-leg-left {
        animation: scurry-outer-leg-left 0.4s cubic-bezier(0.4, 0.0, 0.6, 1) infinite;
        transform-origin: 134px 446px; /* Exact top attachment joint */
    }
    #outer-front-leg-right {
        animation: scurry-outer-leg-right 0.4s cubic-bezier(0.4, 0.0, 0.6, 1) infinite;
        transform-origin: 1058px 453px; /* Exact top attachment joint */
    }
'''
style_elem.text = new_css

tree.write('/Users/max/Projects/inteist.com/inteist.com.main/public/img/projects/rustacean-walking.svg')
print("Successfully recreated rustacean-walking.svg!")

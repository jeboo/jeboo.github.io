// thanks to devtable.com and stackoverflow.com for table template and code samples
var dust_slider = document.getElementById("dust_attack");
var dust_output = document.getElementById("dust_attack_val");
var skull_slider = document.getElementById("skull_delay");
var skull_output = document.getElementById("skull_delay_val");
var drill_slider = document.getElementById("drill_dives");
var drill_output = document.getElementById("drill_dives_val");
var sqmach_slider = document.getElementById("sqmach_1pass");
var sqmach_output = document.getElementById("sqmach_1pass_val");
var wily_slider_1 = document.getElementById("wily_slider_1");
var wily_slider_2 = document.getElementById("wily_slider_2");
var wily_slider_3 = document.getElementById("wily_slider_3");
var wily_output1 = document.getElementById("wily_trow_1");
var wily_output2 = document.getElementById("wily_trow_2");
var wily_output3 = document.getElementById("wily_trow_3");
	
var stock_dust_array = [14, 15, 14, 13, 15, 14, 14, 14, 13, 15, 13, 14, 14, 13, 13, 15, 14, 13, 15, 14, 13, 14, 15, 13];
var stock_skull_array = [1.1, 4.3, 2.0, 0.5, 4.3, 2.0, 0.8, 1.5];
var stock_skull_array_frames = ['40', 'FF', 'A0', '20', 'FF', '70', '30', '5A'];
var stock_drill_array = ['2F', '2A', '2F', '30', '2A', '2F', '30', '2F', '30', '2A', '30', '2F', '30', '2A', '2A', '30', '2F', '2A', '2A', '30', '2F', '2F', '2A', '2A'];
var stock_sqmach_array = [0, 1, 1, 1, 2, 2, 2, 2];
var stock_metman_array = [[1, 2], [3, 4]];
var stock_wily_array = [1, 0, 1, 7, 2, 6, 3, 5, 4, 3, 5, 2, 6, 1, 7];

var rom;
var patch_array = [462418, 461420, 463519, 507231, 435042, 435522, 440506, 401980]; // USA; JPN difference is +5 @ 507231

function init_tables(reset)
{
	// dust tables
	var row = document.getElementById("dust_stock_row");
	var row2 = document.getElementById("dust_patch_row");
    var tbl_data = document.getElementById("dust_table").rows[1].children;
	var i, x;
	
	for(i = 0; i < stock_dust_array.length; i++)
	{
		if (!reset) 
		{ 
			x = row.insertCell(-1);
			x.style.textAlign = "center";
			x.innerHTML = stock_dust_array[i];
			x = row2.insertCell(-1); 
			x.style.textAlign = "center";
		}
		else { x = tbl_data[i + 2]; }
		
		x.innerHTML = stock_dust_array[i];
		x.bgColor = "White";
	}
	
	if (reset)
	{
		dust_slider.value = 6;
		document.getElementById('dust_rnd').checked = true;
	}
	dust_output.innerHTML = dust_slider.value + " (" + Math.round(dust_slider.value/stock_dust_array.length*100) + "%)";
	
	// skull table & selects
	row = document.getElementById("skull_stock_row");
	row2 = document.getElementById("skull_patch_row");
	
	for(i = 0; i < stock_skull_array.length; i++)
	{
		if (!reset) 
		{
			x = row.insertCell(-1);
			x.style.textAlign = "center";
			x.innerHTML = stock_skull_array[i].toFixed(1);
			x = row2.insertCell(-1);
			x.style.textAlign = "center";
			var select_html = "<select id=\"skull_sel_" + i + "\">";
			for(var j = 0; j < stock_skull_array.length; j++)
			{
				select_html += "<option value=\"" + j + "\"" + (i == j ? "selected" : "") +">" + stock_skull_array[j].toFixed(1) + "</option>";	
			}
			select_html += "</select>";
			x.innerHTML = select_html;
		}
		else
		{
			set_skull_tbl(-1);
		}
	}
	
	// drill tables
	row = document.getElementById("drill_stock_row");
	row2 = document.getElementById("drill_patch_row");
    tbl_data = document.getElementById("drill_table").rows[1].children;
	
	for(var i = 0; i < stock_drill_array.length; i++)
	{
		if (!reset)
		{	
			x = row.insertCell(-1);
			x.style.textAlign = "center";
			x.innerHTML = stock_drill_array[i];
			x = row2.insertCell(-1);
			x.style.textAlign = "center";
			x.innerHTML = stock_drill_array[i];
		}
		else { x = tbl_data[i + 2]; }
		
		x.innerHTML = stock_drill_array[i];
		x.bgColor = "White";
	}
	
	if (reset)
	{
		drill_slider.value = 9;
		var radbtn = document.getElementsByName('drill_init');
		for(i = 0; i < 3; i++) { radbtn[i].disabled = false; }
		document.getElementById('drill_i_dive').checked = true;
		document.getElementById('drill_rnd').checked = true;
	}
	drill_output.innerHTML = drill_slider.value + " (" + Math.round(drill_slider.value/stock_drill_array.length*100) + "%)";
	
	// sqmach table & selects
	row = document.getElementById("sqmach_stock_row");
	row2 = document.getElementById("sqmach_patch_row");
	
	for(i = 0; i < stock_sqmach_array.length; i++)
	{
		if (!reset)
		{
			x = row.insertCell(-1);
			x.style.textAlign = "center";
			x.innerHTML = stock_sqmach_array[i];
			x = row2.insertCell(-1);
			x.style.textAlign = "center";
			var select_html = "<select id=\"sqmach_sel_" + i + "\">";
			for(var j = 0; j < 3; j++)
			{
				select_html += "<option value=\"" + j + "\"" + (stock_sqmach_array[i] == j ? "selected" : "") +">" + j + "</option>";	
			}
			
			select_html += "</select>";
			x.innerHTML = select_html;
		}
		else { set_sqmach_tbl(-1); }
	}
	
	//metman tables
	row = document.getElementById("metman_stock_row");
	row2 = document.getElementById("metman_patch_row");
	
	for(i = 0; i < stock_metman_array.length; i++)
	{
		if (!reset)
		{
			if (i == 1)
			{
				x = row.insertCell(-1);
				x.innerHTML = 'Stock close table';
				x = row2.insertCell(-1);
				x.innerHTML = 'Patch close table';
			}
		
			for (var k = 0; k < 2; k++)
			{
				x = row.insertCell(-1);
				x.style.textAlign = "center";
				x.innerHTML = stock_metman_array[i][k];
		
				x = row2.insertCell(-1);
				x.style.textAlign = "center";
				var select_html = "<select id=\"metman_sel_" + (i == 0 ? "o_" : "c_") + k + "\">";
				for(var j = 0; j < 2; j++)
				{	
					select_html += "<option value=\"" + j + "\"" + ((k == j) ? "selected" : "") +">" + stock_metman_array[i][j] + "</option>";	
				}
				select_html += "</select>";
				x.innerHTML = select_html;
			}
		}
		else
		{
			for(i = 0; i < 4; i++)
			{
				var met_select = document.getElementById("metman_sel_" + (i < 2 ? "o_" : "c_") + i % 2);
				met_select.selectedIndex = i % 2 ? 1 : 0;		
			}
		}
	}
	
	// tako trash
	document.getElementById('tako_rnd').checked = true;
		
	// wily tables
	row = document.getElementById("wily_stock_row");
	row2 = document.getElementById("wily_patch_row");
    tbl_data = document.getElementById("wily_table").rows[1].children;
	
	for(i = 0; i < stock_wily_array.length; i++)
	{
		if (!reset)
		{
			x = row.insertCell(-1);
			x.innerHTML = stock_wily_array[i];
			x.style.textAlign = "center";
			x = row2.insertCell(-1);
			x.style.textAlign = "center";
		}
		else { 	x = tbl_data[i + 2]; }
		
		x.innerHTML = stock_wily_array[i];
		x.bgColor = "White";
	}
	
	for(i = 1; i < 4; i++)
	{
		var wily_slider = document.getElementById("wily_slider_" + i);
		wily_slider.value = 7 - i;
		wily_slider.disabled = i != 3 ? false : true;
		
		document.getElementById("wily_row_3").checked = true;
		document.getElementById("wily_hit_3").checked = true;
		document.getElementById("wily_resp_3").checked = true;
	}
	
	wily_updatevalues();
}

function randomize()
{
	var i, x, y;
	
	// reset all values to stock
	init_tables(true);
	
	// dust
	document.getElementsByName("sucks_repl")[Math.round(Math.random() * 2)].checked = true;
	dust_update(Math.round(Math.random() * 24));
	
	//skull
	for(i = 0; i < stock_skull_array.length; i++)
	{
		document.getElementById("skull_sel_" + i).selectedIndex = Math.round(Math.random()*7);
	}
	
	// drill
	document.getElementsByName("drill_init")[Math.round(Math.random() * 2)].checked = true;
	document.getElementsByName("dives_repl")[Math.round(Math.random() * 2)].checked = true;
	drill_update(Math.round(Math.random() * 24));
	
	// sq machine
	for(i = 0; i < stock_sqmach_array.length; i++)
	{
		document.getElementById("sqmach_sel_" + i).selectedIndex = Math.round(Math.random()*2);
	}
	
	// met man
	for(i = 0; i < 4; i++)
	{
		document.getElementById("metman_sel_" + (i < 2 ? "o_" : "c_") + i % 2).selectedIndex = Math.round(Math.random());	
	}
	
	// tako trash
	document.getElementsByName("takotrash_sel")[Math.round(Math.random() * 2)].checked = true;
	
	// wily
	for(i = 1, x = 15; i < 3; x -= y, i++)
	{
		y = Math.round(Math.random()*x);
		document.getElementById("wily_slider_" + i).value = y;
	}
	document.getElementById("wily_slider_" + i).value = x;
		
	document.getElementsByName("wily_hit")[Math.round(Math.random() * 2)].checked = true;
	document.getElementsByName("wily_resp")[Math.round(Math.random() * 2)].checked = true;
	
	wily_updatevalues();
}

dust_slider.oninput = function() {
	dust_update(parseInt(this.value));
}

function dust_update(value)
{
  var stock_sucks = [1, 4, 9, 15, 18, 22];
  var current_action_array = [];
  var i, j, n, x, repl_val;
  var tbl_data = document.getElementById("dust_table").rows[1].children;
  
  for (j = 0, n = 0; j < stock_dust_array.length; j++) 
  {
	current_action_array[j] = tbl_data[j+2].innerText;
	if (tbl_data[j+2].innerText == 15) { n++;}
  }
  
  // slider logic: 
  // = 6, stock tbl
  // < 6, remove suck events in asc order, replace with radio selection
  // > 6, add in asc order
  j = value;
  x = document.getElementsByName('sucks_repl');
  for(i = 0; i < x.length; i++) 
  { 
	if(x[i].checked) { x = i; break; }
  }
  
  if (x == 2)
  {
	repl_val = 13 + Math.round(Math.random());
  }
  else { repl_val = x + 13; }
 
  if (n > j) // remove sucks
  {
	for (i = 0, n -= j; i < 24 && n; i++)
	{
		if (current_action_array[i] == 15)
		{
			current_action_array[i] = repl_val;
			n--;
		}
	}
  }
  else // add sucks (1st in original slots, then asc)
  {
	if (n < 6)
	{
		for (i = 0, j -= n; i < 24 && j; i++)
		{
			current_action_array[stock_sucks[6-j-n]] = 15;
			j--;
		}
	}
	else
	{
		for (i = 0, j -= n; i < 24 && j; i++)
		{
			if (current_action_array[i] != 15)
			{
				current_action_array[i] = 15;
				j--;
			}
		}
	}  
  }  
  
  for(i = 0; i < stock_dust_array.length; i++)
  {
	tbl_data[i + 2].innerText = current_action_array[i];
	tbl_data[i + 2].bgColor = current_action_array[i] != stock_dust_array[i] ? "Red" : "White";
  }
  
  dust_slider.value = value;
  dust_output.innerHTML = dust_slider.value + " (" + Math.round(dust_slider.value/stock_dust_array.length*100) + "%)";
}

function set_skull_tbl(value)
{
	for(var i = 0; i < stock_skull_array.length; i++)
	{
		var sel_td = document.getElementById("skull_sel_" + i);
		if(value == -1) { sel_td.selectedIndex = i; }
		else { sel_td.selectedIndex = value; }
	}
}	

skull_min.onclick = function() {
	set_skull_tbl(3);
}

skull_max.onclick = function() {
	set_skull_tbl(1);
}

drill_slider.oninput = function() {
	drill_update(parseInt(this.value));
}

function drill_update(value)
{	
  var stock_dives = [1, 4, 9, 13, 14, 17, 18, 22, 23];
  var dives_repl_array = ['2F', '30'];
  var current_action_array = [];
  var i, j, n, x, repl_val;
  var tbl_data = document.getElementById("drill_table").rows[1].children;
  
  for (j = 2, n = 0; j < tbl_data.length; j++) 
  {
	current_action_array[j-2] = tbl_data[j].innerText;
	if (tbl_data[j].innerText == '2A') { n++;}
  }
  
  // slider logic: 
  // = 9, stock tbl
  // < 9, remove dive events in asc order, replace with radio selection
  // > 9, add in asc order
  j = value;
  x = document.getElementsByName('dives_repl');
  for(i = 0; i < x.length; i++) 
  { 
	if(x[i].checked) { x = i; break; }
  }
  
  if (x == 2)
  {
	repl_val = dives_repl_array[Math.round(Math.random())];
  }
  else { repl_val = dives_repl_array[x] }
 
  if (n > j) // remove dives
  {
	for (i = 0, n -= j; i < 24 && n; i++)
	{
		if (current_action_array[i] == '2A')
		{
			current_action_array[i] = repl_val;
			n--;
		}
	}
  }
  else // add dives (1st in original slots, then asc)
  {
	if (n < 9)
	{
		for (i = 0, j -= n; i < 24 && j; i++)
		{
			current_action_array[stock_dives[9-j-n]] = '2A';
			j--;
		}
	}
	else
	{
		for (i = 0, j -= n; i < 24 && j; i++)
		{
			if (current_action_array[i] != '2A')
			{
				current_action_array[i] = '2A';
				j--;
			}
		}
	}  
  }  
  
  for(i = 0; i < 24; i++)
  {
	tbl_data[i + 2].innerText = current_action_array[i];
	tbl_data[i + 2].bgColor = current_action_array[i] != stock_drill_array[i] ? "Red" : "White";
  }
  
  drill_slider.value = value;
  drill_output.innerHTML = drill_slider.value + " (" + Math.round(drill_slider.value/stock_drill_array.length*100) + "%)";
}

function set_sqmach_tbl(value)
{
	for(var i = 0; i < stock_sqmach_array.length; i++)
	{
		var sel_td = document.getElementById("sqmach_sel_" + i);
		if (value == -1) { sel_td.selectedIndex = stock_sqmach_array[i]; }
		else { sel_td.selectedIndex = value; }
	}
}	

sqmach_1.onclick = function() {
	set_sqmach_tbl(0);
}

sqmach_2.onclick = function() {
	set_sqmach_tbl(1);
}

sqmach_3.onclick = function() {
	set_sqmach_tbl(2);
}

function set_metman_tbl(value)
{
	for(var i = 0; i < stock_metman_array.length; i++)
	{
		var sel_td = document.getElementById("metman_sel_o_" + i);
		sel_td.selectedIndex = value ? 0 : 1;
		sel_td = document.getElementById("metman_sel_c_" + i);
		sel_td.selectedIndex = value ? 1 : 0;
	}
}	

metman_best.onclick = function() {
	set_metman_tbl(0);
}

metman_worst.onclick = function() {
	set_metman_tbl(1);
}

function wily_slider(value)
{
	var wily_parent, wily_parent2, wily_child, wily_child2, wily_old, wily_slider;
	var p_value, c_value, l_value, abschange, direction = 1;
	var i, j;
	
	// find locked slider
	for(i = 1; i < 4; i++)
	{
		wily_slider = document.getElementById("wily_slider_" + i);
		l_value = parseInt(wily_slider.value);
		if(wily_slider.disabled == true) { break; }
	}
	
	// find child slider
	for(j = 1; j < 4 && (j == value || j == i); j++);

	wily_parent = document.getElementById("wily_slider_" + value);
	p_value = parseInt(wily_parent.value);
	wily_child = document.getElementById("wily_slider_" + j);
	c_value = parseInt(wily_child.value);
	
	if (wily_parent.value < parseInt(wily_parent.name)) { direction = -1; }
	abschange = (wily_parent.value - wily_parent.name) * direction;
	
	// ensure change is valid by adjusting child in opposite direction, and sum of new values + locked < 16
	if ((direction > 0 && (c_value - abschange) >= 0) || 
		  (direction < 0 && (c_value + abschange < 16)) &&
			(p_value + c_value + l_value < 16 ) )
	{ 
		wily_parent.name = p_value;
		wily_parent2 = document.getElementById("wily_trow_" + value);
		wily_parent2.innerHTML = p_value + " (" + Math.round(p_value/stock_wily_array.length*100) + "%)";
		
		child_old = wily_child.value;
		c_value += abschange * direction * -1;
		wily_child.value = c_value;
		wily_child.name = wily_child.value;
		wily_child2 = document.getElementById("wily_trow_" + j);
		wily_child2.innerHTML = c_value + " (" + Math.round(c_value/stock_wily_array.length*100) + "%)"; 
		
		wily_updatevalues(); 
	}
	else
	{
		wily_parent.value = parseInt(wily_parent.name);
	}
	 
	
}

function wily_updatevalues()
{
	wily_output1.innerHTML = wily_slider_1.value + " (" + Math.round(wily_slider_1.value/stock_wily_array.length*100) + "%)";
	wily_output2.innerHTML = wily_slider_2.value + " (" + Math.round(wily_slider_2.value/stock_wily_array.length*100) + "%)";
	wily_output3.innerHTML = wily_slider_3.value + " (" + Math.round(wily_slider_3.value/stock_wily_array.length*100) + "%)";

	// use name field as old value storage
	for(i = 1; i < 4; i++)
	{
		document.getElementById("wily_slider_" + i).name = document.getElementById("wily_slider_" + i).value;
	}
	
	update_wily_tbl();
}

function update_wily_tbl()
{	
	// update patch table
	var spawn_array = [[0, 1, 2], [3, 4, 5], [6, 7]];
	var slider_vals = [], current_array = [];
	var i, j, k, x;
	var tbl_data = document.getElementById("wily_table").rows[1].children;
	var wily_slider;
	
	for(i = 0, j = 0; i < 3; i++)
	{
		slider_vals[i] = parseInt(document.getElementById("wily_slider_" + (i+1)).value);
		if(slider_vals[i] == 6-i) { j++; }
	}
	
	for(i = 0; i < stock_wily_array.length; i++) { current_array[i] = -1; }
	
	if(j != 3)
	{
		for(j = 0; j < 3; j++)
		{
			for(i = 0, x = slider_vals[j]; x; k++, x--)
			{
				for(k = Math.round(Math.random()*stock_wily_array.length); current_array[k] != -1; k = Math.round(Math.random()*stock_wily_array.length));
				current_array[k] = 0;
				tbl_data[2 + k].innerHTML = spawn_array[j][i++];
				if(i == spawn_array[j].length) { i = 0; }
			}
		}
	}
	else // if 6,5,4, use stock array
	{
		for(i = 0; i < stock_wily_array.length; i++)
		{
			tbl_data[2 + i].innerHTML = stock_wily_array[i];
		}
	}
}

wily_slider_1.onchange = function() {
	wily_slider(1);
}

wily_slider_2.onchange = function() {
	wily_slider(2);
}

wily_slider_3.onchange = function() {
	wily_slider(3);
}

function wily_lock(value)
{
	for(var i = 1; i < 4; i++)
	{
		document.getElementById("wily_slider_" + i).disabled = i == value ? true : false;
	}
}

wily_row_1.onclick = function() {	
	wily_lock(1);
}

wily_row_2.onclick = function() {	
	wily_lock(2);
}

wily_row_3.onclick = function() {	
	wily_lock(3);
}

var crc32=function(r){for(var a,o=[],c=0;c<256;c++){a=c;for(var f=0;f<8;f++)a=1&a?3988292384^a>>>1:a>>>1;o[c]=a}for(var n=-1,t=0;t<r.length;t++)n=n>>>8^o[255&(n^r[t])];return(-1^n)>>>0};

function hex_to_sint(value)
{
	var x = parseInt('0x' + value);
	if ((x & 0x80)) { x -= 0x100; }
	
	return x;
}

genrom.onclick = function() {
	createrom();
}

function createrom()
{	
	var i, j, k, x;
	var rom_patched = new Uint8Array(rom);
	var country = document.getElementById("genrom").innerText.indexOf("USA") != -1 ? 0 : 1;
	
	// dust patch, just 24 byte table
	for(j = 0, i = 0; j < stock_dust_array.length; j++)
	{
		 rom_patched[patch_array[i] + j] = hex_to_sint(document.getElementById("dust_table").rows[1].children[2 + j].innerHTML);
	}
	
	// skull patch, convert seconds to stock tbl frames for patch
	for(j = 0, i++; j < stock_skull_array.length; j++)
	{
		rom_patched[patch_array[i] + j] = hex_to_sint(stock_skull_array_frames[document.getElementById("skull_sel_" + j).selectedIndex]);
	}
	
	// drill, 2 patches: patch the initial action code and then new table
	var drill_init_action = ['2A', '2F', '30'];
	var drill_init_patch = ['A9', '00', 'D0', '0B'];
	var radbtn = document.getElementsByName('drill_init');
	var tbl_data = document.getElementById("drill_table").rows[1].children;
  
	// init action
	for(x = 0, i++; x < radbtn.length && !radbtn[x].checked; x++);
	
	if (x !=0 || tbl_data[3].innerHTML != '2A')
	{
		drill_init_patch[1] = drill_init_action[x];
	}
	else
	{ // stock code if a dive
		drill_init_patch[0] = 'A0';
		drill_init_patch[1] = '01';
		drill_init_patch[3] = '08';
	}
	for(j = 0; j < 4; j++) { rom_patched[patch_array[i] - 582 + j] = hex_to_sint(drill_init_patch[j]); }
	
	for(j = 0; j < stock_drill_array.length; j++)
	{
		 rom_patched[patch_array[i] + j] = hex_to_sint(tbl_data[2 + j].innerHTML);
	}
		
	// square machine
	for(j = 0, i++; j < stock_sqmach_array.length; j++)
	{
		rom_patched[patch_array[i] + j + country*5] = hex_to_sint(document.getElementById("sqmach_sel_" + j).selectedIndex);
	}
	
	// met man
	for(j = 0, i++; j < 2; j++)
	{
		rom_patched[patch_array[i] + j] = hex_to_sint(((document.getElementById("metman_sel_c_" + j).selectedIndex + 3)*60).toString(16));
		rom_patched[patch_array[i] + j + 2] = hex_to_sint(((document.getElementById("metman_sel_o_" + j).selectedIndex + 1)*60).toString(16));
	}
	
	// tako trash, single byte patch
	var tako_patches = ['00', 'FF', '01'];
	radbtn = document.getElementsByName('takotrash_sel');
	for(j = 0, i++; j < radbtn.length; j++) { if(radbtn[j].checked) { break; } }
	rom_patched[patch_array[i]] = hex_to_sint(tako_patches[j]);	
	
	// wily patches: spawn table, then the delay tables
	var wily_patches = [['3C', '3C'], ['5A', '5A'], ['3C', '5A'], ['3C', '3C'], ['96', '96'], ['3C', '96']];
	var wily_hitresp_patch = [];
	var wily_radios = ['wily_hit', 'wily_resp'];
	for(j = 0, i++; j < stock_wily_array.length; j++)
	{
		 rom_patched[patch_array[i] + j] = hex_to_sint(document.getElementById("wily_table").rows[1].children[2 + j].innerHTML);
	}
	
	for(k = 0; k < 2; k++)
	{
		radbtn = document.getElementsByName(wily_radios[k]);
		for(j = 0; j < radbtn.length; j++) { if(radbtn[j].checked) { break; } }
		for(x = 0; x < 2; x++) { rom_patched[patch_array[i] + 104 + x + k*2] = hex_to_sint(wily_patches[j+k*3][x]); }
	}
	
	// update title screen 'WORD' to RNGx, where x = version; JPN doesnt have compelete char set available, use RDGA
	//                  N    2      R    G
	var ver_array = [['17', '02', '1B', '10'], ['AA', '88', '9F', 'AB']];	
	for(j = 0, i++; j < 4; j++)
	{
		rom_patched[patch_array[i] + j + (j > 1 ? 253 : 0)] = hex_to_sint(ver_array[country][j]);
	}
		
	// final rom dump, prompt save as dlg with crc32 appended
	download(rom_patched, (country ? "rm4_" : "mm4_") + crc32(rom_patched).toString(16).toUpperCase() + ".nes", 'binary');
}

btn_resetstock.onclick = function()
{
	init_tables(true);
}

btn_randomize.onclick = function()
{
	randomize();
}

btn_randomizeblind.onclick = function()
{
	randomize();
	createrom();
	// reset to stock to hide values
	init_tables(true);
}

// Function to download data to a file
function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

var openFile = function(event) {
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function()
	{
      window.rom = reader.result;
	}
	
	reader.readAsArrayBuffer(input.files[0]);
}
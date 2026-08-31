/**
 * IBM BAW 24.X — Coach View Sample
 * Scenario: Dynamic Dropdown Population on Load + Cascading Dropdowns
 */

// ============================================================
// Country Dropdown — On Load Event
// ============================================================
var me = this;
var serviceArgs = {
    params: JSON.stringify({}),
    load: function(data) {
        if (data.countries && data.countries.length > 0) {
            var selectElement = me.context.element.querySelector("select");
            while (selectElement.options.length > 1) {
                selectElement.remove(1);
            }
            data.countries.forEach(function(country) {
                var option = document.createElement("option");
                option.value = country.code;
                option.textContent = country.name;
                selectElement.appendChild(option);
            });
        }
    },
    error: function(e) { console.error("Failed to load countries:", e); }
};
me.context.options.getCountriesService(serviceArgs);

// ============================================================
// Country Dropdown — On Change Event (Cascading to State)
// ============================================================
var selectedCountry = me.getData();
if (selectedCountry) {
    ${StateDropdown}.setData("");
    ${CityDropdown}.setData("");
    var serviceArgs = {
        params: JSON.stringify({ countryCode: selectedCountry }),
        load: function(data) {
            var stateSelect = ${StateDropdown}.context.element.querySelector("select");
            while (stateSelect.options.length > 1) { stateSelect.remove(1); }
            if (data.states) {
                data.states.forEach(function(state) {
                    var option = document.createElement("option");
                    option.value = state.code;
                    option.textContent = state.name;
                    stateSelect.appendChild(option);
                });
            }
        },
        error: function(e) { console.error("Failed to load states:", e); }
    };
    me.context.options.getStatesService(serviceArgs);
}

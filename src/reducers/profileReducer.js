

const INITIAL_STATE = {
uni:{},
uni_name:'',
notes:[],
links:[],
};

export function profileReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case "FETCHED_USER_PROFILE":
        return  {...state, uni: action.payload}
        break;
      case "NOTES_RETIREVED":
        return  {...state, notes: action.payload}
        break;
      case "LINKS_RETIREVED":
        return  {...state, links: action.payload}
        break;
      case "INFO_RETIREVED":
        return {...state, [action.payload.prop]: action.payload.value}
      case 'ADD_TO_CART':
        return {...state, notes: action.payload}
      case 'DELETE_FROM_CART':
        return {...state, notes: action.payload}
      case 'ADD_LINK_TO_CART':
        return {...state, links: action.payload}
      case 'DELETE_LINK_FROM_CART':
        return {...state, links: action.payload}
      default:
        return state;
    }
};



const universities = {
"type": "FeatureCollection",
"features": [
{
"type": "Feature",
"properties": {
"scalerank": 1,
"featurecla": "Admin-0 country",
"labelrank": 6,
"sovereignt": "Belize",
"sov_a3": "BLZ",
"adm0_dif": 0,
"level": 2,
"type": "Sovereign country",
"admin": "Belize",
"adm0_a3": "BLZ",
"geou_dif": 0,
"geounit": "Belize",
"gu_a3": "BLZ",
"su_dif": 0,
"subunit": "Belize",
"su_a3": "BLZ",
"brk_diff": 0,
"name": "Belize",
"name_long": "Belize",
"brk_a3": "BLZ",
"brk_name": "Belize",
"brk_group": null,
"abbrev": "Belize",
"postal": "BZ",
"formal_en": "Belize",
"formal_fr": null,
"note_adm0": null,
"note_brk": null,
"name_sort": "Belize",
"name_alt": null,
"mapcolor7": 1,
"mapcolor8": 4,
"mapcolor9": 5,
"mapcolor13": 7,
"pop_est": 307899,
"gdp_md_est": 2536,
"pop_year": -99,
"lastcensus": 2010,
"gdp_year": -99,
"economy": "6. Developing region",
"income_grp": "4. Lower middle income",
"wikipedia": -99,
"fips_10": null,
"iso_a2": "BZ",
"iso_a3": "BLZ",
"iso_n3": "084",
"un_a3": "084",
"wb_a2": "BZ",
"wb_a3": "BLZ",
"woe_id": -99,
"adm0_a3_is": "BLZ",
"adm0_a3_us": "BLZ",
"adm0_a3_un": -99,
"adm0_a3_wb": -99,
"continent": "North America",
"region_un": "Americas",
"subregion": "Central America",
"region_wb": "Latin America & Caribbean",
"name_len": 6,
"long_len": 6,
"abbrev_len": 6,
"tiny": -99,
"homepart": 1,
"filename": "BLZ.geojson"
},
"geometry": {
"coordinates": [
121.5406792,
25.0136906
],
"type": "Point"
}
},
{
"type": "Feature",
"properties": {
"scalerank": 1,
"featurecla": "Admin-0 country",
"labelrank": 6,
"sovereignt": "Belize",
"sov_a3": "BLZ",
"adm0_dif": 0,
"level": 2,
"type": "Sovereign country",
"admin": "Belize",
"adm0_a3": "BLZ",
"geou_dif": 0,
"geounit": "Belize",
"gu_a3": "BLZ",
"su_dif": 0,
"subunit": "Belize",
"su_a3": "BLZ",
"brk_diff": 0,
"name": "Belize",
"name_long": "Belize",
"brk_a3": "BLZ",
"brk_name": "Belize",
"brk_group": null,
"abbrev": "Belize",
"postal": "BZ",
"formal_en": "Belize",
"formal_fr": null,
"note_adm0": null,
"note_brk": null,
"name_sort": "Belize",
"name_alt": null,
"mapcolor7": 1,
"mapcolor8": 4,
"mapcolor9": 5,
"mapcolor13": 7,
"pop_est": 307899,
"gdp_md_est": 2536,
"pop_year": -99,
"lastcensus": 2010,
"gdp_year": -99,
"economy": "6. Developing region",
"income_grp": "4. Lower middle income",
"wikipedia": -99,
"fips_10": null,
"iso_a2": "BZ",
"iso_a3": "BLZ",
"iso_n3": "084",
"un_a3": "084",
"wb_a2": "BZ",
"wb_a3": "BLZ",
"woe_id": -99,
"adm0_a3_is": "BLZ",
"adm0_a3_us": "BLZ",
"adm0_a3_un": -99,
"adm0_a3_wb": -99,
"continent": "North America",
"region_un": "Americas",
"subregion": "Central America",
"region_wb": "Latin America & Caribbean",
"name_len": 6,
"long_len": 6,
"abbrev_len": 6,
"tiny": -99,
"homepart": 1,
"filename": "BLZ.geojson"
},
"geometry": {
"coordinates": [
121.2674614,
24.9701632
],
"type": "Point"
}
},
{
"type": "Feature",
"properties": {
"scalerank": 1,
"featurecla": "Admin-0 country",
"labelrank": 6,
"sovereignt": "Belize",
"sov_a3": "BLZ",
"adm0_dif": 0,
"level": 2,
"type": "Sovereign country",
"admin": "Belize",
"adm0_a3": "BLZ",
"geou_dif": 0,
"geounit": "Belize",
"gu_a3": "BLZ",
"su_dif": 0,
"subunit": "Belize",
"su_a3": "BLZ",
"brk_diff": 0,
"name": "Belize",
"name_long": "Belize",
"brk_a3": "BLZ",
"brk_name": "Belize",
"brk_group": null,
"abbrev": "Belize",
"postal": "BZ",
"formal_en": "Belize",
"formal_fr": null,
"note_adm0": null,
"note_brk": null,
"name_sort": "Belize",
"name_alt": null,
"mapcolor7": 1,
"mapcolor8": 4,
"mapcolor9": 5,
"mapcolor13": 7,
"pop_est": 307899,
"gdp_md_est": 2536,
"pop_year": -99,
"lastcensus": 2010,
"gdp_year": -99,
"economy": "6. Developing region",
"income_grp": "4. Lower middle income",
"wikipedia": -99,
"fips_10": null,
"iso_a2": "BZ",
"iso_a3": "BLZ",
"iso_n3": "084",
"un_a3": "084",
"wb_a2": "BZ",
"wb_a3": "BLZ",
"woe_id": -99,
"adm0_a3_is": "BLZ",
"adm0_a3_us": "BLZ",
"adm0_a3_un": -99,
"adm0_a3_wb": -99,
"continent": "North America",
"region_un": "Americas",
"subregion": "Central America",
"region_wb": "Latin America & Caribbean",
"name_len": 6,
"long_len": 6,
"abbrev_len": 6,
"tiny": -99,
"homepart": 1,
"filename": "BLZ.geojson"
},
"geometry": {
"coordinates": [
121.38748559999999,
25.0334479
],
"type": "Point"
}
}
]
}

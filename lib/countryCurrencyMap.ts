// Country code to currency code mapping (ISO 3166-1 alpha-2 to ISO 4217)
// 
// UK AND UK TERRITORIES INCLUDED:
// GB - United Kingdom (GBP) - Includes: England, Scotland, Wales, Northern Ireland
// GG - Guernsey (GBP), JE - Jersey (GBP), IM - Isle of Man (GBP),
// GI - Gibraltar (GIP), FK - Falkland Islands (FKP), GS - South Georgia (GBP),
// SH - Saint Helena (SHP), PN - Pitcairn (NZD), TC - Turks and Caicos (USD),
// VG - British Virgin Islands (USD), AI - Anguilla (XCD), MS - Montserrat (XCD),
// KY - Cayman Islands (KYD), BM - Bermuda (BMD), IO - British Indian Ocean Territory (USD)
// Note: Wales, England, Scotland, and Northern Ireland all use GB country code and GBP currency
//
// NEARBY COUNTRIES TO UK INCLUDED:
// IE - Ireland (EUR), FR - France (EUR), BE - Belgium (EUR), NL - Netherlands (EUR),
// DE - Germany (EUR), DK - Denmark (DKK), NO - Norway (NOK), IS - Iceland (ISK),
// ES - Spain (EUR), PT - Portugal (EUR), LU - Luxembourg (EUR), CH - Switzerland (CHF),
// AT - Austria (EUR), CZ - Czech Republic (CZK), PL - Poland (PLN), SE - Sweden (SEK),
// FI - Finland (EUR), EE - Estonia (EUR), LV - Latvia (EUR), LT - Lithuania (EUR)
//
const COUNTRY_TO_CURRENCY: Record<string, { code: string; name: string }> = {
  // A
  'AD': { code: 'EUR', name: 'Euro' }, // Andorra
  'AE': { code: 'AED', name: 'UAE Dirham' }, // United Arab Emirates
  'AF': { code: 'AFN', name: 'Afghan Afghani' }, // Afghanistan
  'AG': { code: 'XCD', name: 'East Caribbean Dollar' }, // Antigua and Barbuda
  'AI': { code: 'XCD', name: 'East Caribbean Dollar' }, // Anguilla
  'AL': { code: 'ALL', name: 'Albanian Lek' }, // Albania
  'AM': { code: 'AMD', name: 'Armenian Dram' }, // Armenia
  'AO': { code: 'AOA', name: 'Angolan Kwanza' }, // Angola
  'AQ': { code: 'USD', name: 'US Dollar' }, // Antarctica
  'AR': { code: 'ARS', name: 'Argentine Peso' }, // Argentina
  'AS': { code: 'USD', name: 'US Dollar' }, // American Samoa
  'AT': { code: 'EUR', name: 'Euro' }, // Austria
  'AU': { code: 'AUD', name: 'Australian Dollar' }, // Australia
  'AW': { code: 'AWG', name: 'Aruban Florin' }, // Aruba
  'AX': { code: 'EUR', name: 'Euro' }, // Åland Islands
  'AZ': { code: 'AZN', name: 'Azerbaijani Manat' }, // Azerbaijan
  
  // B
  'BA': { code: 'BAM', name: 'Bosnia-Herzegovina Convertible Mark' }, // Bosnia and Herzegovina
  'BB': { code: 'BBD', name: 'Barbadian Dollar' }, // Barbados
  'BD': { code: 'BDT', name: 'Bangladeshi Taka' }, // Bangladesh
  'BE': { code: 'EUR', name: 'Euro' }, // Belgium
  'BF': { code: 'XOF', name: 'West African CFA Franc' }, // Burkina Faso
  'BG': { code: 'BGN', name: 'Bulgarian Lev' }, // Bulgaria
  'BH': { code: 'BHD', name: 'Bahraini Dinar' }, // Bahrain
  'BI': { code: 'BIF', name: 'Burundian Franc' }, // Burundi
  'BJ': { code: 'XOF', name: 'West African CFA Franc' }, // Benin
  'BL': { code: 'EUR', name: 'Euro' }, // Saint Barthélemy
  'BM': { code: 'BMD', name: 'Bermudan Dollar' }, // Bermuda
  'BN': { code: 'BND', name: 'Brunei Dollar' }, // Brunei
  'BO': { code: 'BOB', name: 'Bolivian Boliviano' }, // Bolivia
  'BQ': { code: 'USD', name: 'US Dollar' }, // Caribbean Netherlands
  'BR': { code: 'BRL', name: 'Brazilian Real' }, // Brazil
  'BS': { code: 'BSD', name: 'Bahamian Dollar' }, // Bahamas
  'BT': { code: 'BTN', name: 'Bhutanese Ngultrum' }, // Bhutan
  'BV': { code: 'NOK', name: 'Norwegian Krone' }, // Bouvet Island
  'BW': { code: 'BWP', name: 'Botswanan Pula' }, // Botswana
  'BY': { code: 'BYN', name: 'Belarusian Ruble' }, // Belarus
  'BZ': { code: 'BZD', name: 'Belize Dollar' }, // Belize
  
  // C
  'CA': { code: 'CAD', name: 'Canadian Dollar' }, // Canada
  'CC': { code: 'AUD', name: 'Australian Dollar' }, // Cocos (Keeling) Islands
  'CD': { code: 'CDF', name: 'Congolese Franc' }, // Congo (DRC)
  'CF': { code: 'XAF', name: 'Central African CFA Franc' }, // Central African Republic
  'CG': { code: 'XAF', name: 'Central African CFA Franc' }, // Congo (Republic)
  'CH': { code: 'CHF', name: 'Swiss Franc' }, // Switzerland
  'CI': { code: 'XOF', name: 'West African CFA Franc' }, // Côte d'Ivoire
  'CK': { code: 'NZD', name: 'New Zealand Dollar' }, // Cook Islands
  'CL': { code: 'CLP', name: 'Chilean Peso' }, // Chile
  'CM': { code: 'XAF', name: 'Central African CFA Franc' }, // Cameroon
  'CN': { code: 'CNY', name: 'Chinese Yuan' }, // China
  'CO': { code: 'COP', name: 'Colombian Peso' }, // Colombia
  'CR': { code: 'CRC', name: 'Costa Rican Colón' }, // Costa Rica
  'CU': { code: 'CUP', name: 'Cuban Peso' }, // Cuba
  'CV': { code: 'CVE', name: 'Cape Verdean Escudo' }, // Cape Verde
  'CW': { code: 'ANG', name: 'Netherlands Antillean Guilder' }, // Curaçao
  'CX': { code: 'AUD', name: 'Australian Dollar' }, // Christmas Island
  'CY': { code: 'EUR', name: 'Euro' }, // Cyprus
  'CZ': { code: 'CZK', name: 'Czech Koruna' }, // Czech Republic
  
  // D
  'DE': { code: 'EUR', name: 'Euro' }, // Germany
  'DJ': { code: 'DJF', name: 'Djiboutian Franc' }, // Djibouti
  'DK': { code: 'DKK', name: 'Danish Krone' }, // Denmark
  'DM': { code: 'XCD', name: 'East Caribbean Dollar' }, // Dominica
  'DO': { code: 'DOP', name: 'Dominican Peso' }, // Dominican Republic
  'DZ': { code: 'DZD', name: 'Algerian Dinar' }, // Algeria
  
  // E
  'EC': { code: 'USD', name: 'US Dollar' }, // Ecuador
  'EE': { code: 'EUR', name: 'Euro' }, // Estonia
  'EG': { code: 'EGP', name: 'Egyptian Pound' }, // Egypt
  'EH': { code: 'MAD', name: 'Moroccan Dirham' }, // Western Sahara
  'ER': { code: 'ERN', name: 'Eritrean Nakfa' }, // Eritrea
  'ES': { code: 'EUR', name: 'Euro' }, // Spain
  'ET': { code: 'ETB', name: 'Ethiopian Birr' }, // Ethiopia
  
  // F
  'FI': { code: 'EUR', name: 'Euro' }, // Finland
  'FJ': { code: 'FJD', name: 'Fijian Dollar' }, // Fiji
  'FK': { code: 'FKP', name: 'Falkland Islands Pound' }, // Falkland Islands
  'FM': { code: 'USD', name: 'US Dollar' }, // Micronesia
  'FO': { code: 'DKK', name: 'Danish Krone' }, // Faroe Islands
  'FR': { code: 'EUR', name: 'Euro' }, // France
  
  // G
  'GA': { code: 'XAF', name: 'Central African CFA Franc' }, // Gabon
  'GB': { code: 'GBP', name: 'British Pound' }, // United Kingdom
  'GD': { code: 'XCD', name: 'East Caribbean Dollar' }, // Grenada
  'GE': { code: 'GEL', name: 'Georgian Lari' }, // Georgia
  'GF': { code: 'EUR', name: 'Euro' }, // French Guiana
  'GG': { code: 'GBP', name: 'British Pound' }, // Guernsey
  'GH': { code: 'GHS', name: 'Ghanaian Cedi' }, // Ghana
  'GI': { code: 'GIP', name: 'Gibraltar Pound' }, // Gibraltar
  'GL': { code: 'DKK', name: 'Danish Krone' }, // Greenland
  'GM': { code: 'GMD', name: 'Gambian Dalasi' }, // Gambia
  'GN': { code: 'GNF', name: 'Guinean Franc' }, // Guinea
  'GP': { code: 'EUR', name: 'Euro' }, // Guadeloupe
  'GQ': { code: 'XAF', name: 'Central African CFA Franc' }, // Equatorial Guinea
  'GR': { code: 'EUR', name: 'Euro' }, // Greece
  'GS': { code: 'GBP', name: 'British Pound' }, // South Georgia and the South Sandwich Islands
  'GT': { code: 'GTQ', name: 'Guatemalan Quetzal' }, // Guatemala
  'GU': { code: 'USD', name: 'US Dollar' }, // Guam
  'GW': { code: 'XOF', name: 'West African CFA Franc' }, // Guinea-Bissau
  'GY': { code: 'GYD', name: 'Guyanaese Dollar' }, // Guyana
  
  // H
  'HK': { code: 'HKD', name: 'Hong Kong Dollar' }, // Hong Kong
  'HM': { code: 'AUD', name: 'Australian Dollar' }, // Heard Island and McDonald Islands
  'HN': { code: 'HNL', name: 'Honduran Lempira' }, // Honduras
  'HR': { code: 'EUR', name: 'Euro' }, // Croatia
  'HT': { code: 'HTG', name: 'Haitian Gourde' }, // Haiti
  'HU': { code: 'HUF', name: 'Hungarian Forint' }, // Hungary
  
  // I
  'ID': { code: 'IDR', name: 'Indonesian Rupiah' }, // Indonesia
  'IE': { code: 'EUR', name: 'Euro' }, // Ireland
  'IL': { code: 'ILS', name: 'Israeli New Sheqel' }, // Israel
  'IM': { code: 'GBP', name: 'British Pound' }, // Isle of Man
  'IN': { code: 'INR', name: 'Indian Rupee' }, // India
  'IO': { code: 'USD', name: 'US Dollar' }, // British Indian Ocean Territory
  'IQ': { code: 'IQD', name: 'Iraqi Dinar' }, // Iraq
  'IR': { code: 'IRR', name: 'Iranian Rial' }, // Iran
  'IS': { code: 'ISK', name: 'Icelandic Króna' }, // Iceland
  'IT': { code: 'EUR', name: 'Euro' }, // Italy
  
  // J
  'JE': { code: 'GBP', name: 'British Pound' }, // Jersey
  'JM': { code: 'JMD', name: 'Jamaican Dollar' }, // Jamaica
  'JO': { code: 'JOD', name: 'Jordanian Dinar' }, // Jordan
  'JP': { code: 'JPY', name: 'Japanese Yen' }, // Japan
  
  // K
  'KE': { code: 'KES', name: 'Kenyan Shilling' }, // Kenya
  'KG': { code: 'KGS', name: 'Kyrgystani Som' }, // Kyrgyzstan
  'KH': { code: 'KHR', name: 'Cambodian Riel' }, // Cambodia
  'KI': { code: 'AUD', name: 'Australian Dollar' }, // Kiribati
  'KM': { code: 'KMF', name: 'Comorian Franc' }, // Comoros
  'KN': { code: 'XCD', name: 'East Caribbean Dollar' }, // Saint Kitts and Nevis
  'KP': { code: 'KPW', name: 'North Korean Won' }, // North Korea
  'KR': { code: 'KRW', name: 'South Korean Won' }, // South Korea
  'KW': { code: 'KWD', name: 'Kuwaiti Dinar' }, // Kuwait
  'KY': { code: 'KYD', name: 'Cayman Islands Dollar' }, // Cayman Islands
  'KZ': { code: 'KZT', name: 'Kazakhstani Tenge' }, // Kazakhstan
  
  // L
  'LA': { code: 'LAK', name: 'Laotian Kip' }, // Laos
  'LB': { code: 'LBP', name: 'Lebanese Pound' }, // Lebanon
  'LC': { code: 'XCD', name: 'East Caribbean Dollar' }, // Saint Lucia
  'LI': { code: 'CHF', name: 'Swiss Franc' }, // Liechtenstein
  'LK': { code: 'LKR', name: 'Sri Lankan Rupee' }, // Sri Lanka
  'LR': { code: 'LRD', name: 'Liberian Dollar' }, // Liberia
  'LS': { code: 'LSL', name: 'Lesotho Loti' }, // Lesotho
  'LT': { code: 'EUR', name: 'Euro' }, // Lithuania
  'LU': { code: 'EUR', name: 'Euro' }, // Luxembourg
  'LV': { code: 'EUR', name: 'Euro' }, // Latvia
  'LY': { code: 'LYD', name: 'Libyan Dinar' }, // Libya
  
  // M
  'MA': { code: 'MAD', name: 'Moroccan Dirham' }, // Morocco
  'MC': { code: 'EUR', name: 'Euro' }, // Monaco
  'MD': { code: 'MDL', name: 'Moldovan Leu' }, // Moldova
  'ME': { code: 'EUR', name: 'Euro' }, // Montenegro
  'MF': { code: 'EUR', name: 'Euro' }, // Saint Martin
  'MG': { code: 'MGA', name: 'Malagasy Ariary' }, // Madagascar
  'MH': { code: 'USD', name: 'US Dollar' }, // Marshall Islands
  'MK': { code: 'MKD', name: 'Macedonian Denar' }, // North Macedonia
  'ML': { code: 'XOF', name: 'West African CFA Franc' }, // Mali
  'MM': { code: 'MMK', name: 'Myanma Kyat' }, // Myanmar
  'MN': { code: 'MNT', name: 'Mongolian Tugrik' }, // Mongolia
  'MO': { code: 'MOP', name: 'Macanese Pataca' }, // Macau
  'MP': { code: 'USD', name: 'US Dollar' }, // Northern Mariana Islands
  'MQ': { code: 'EUR', name: 'Euro' }, // Martinique
  'MR': { code: 'MRU', name: 'Mauritanian Ouguiya' }, // Mauritania
  'MS': { code: 'XCD', name: 'East Caribbean Dollar' }, // Montserrat
  'MT': { code: 'EUR', name: 'Euro' }, // Malta
  'MU': { code: 'MUR', name: 'Mauritian Rupee' }, // Mauritius
  'MV': { code: 'MVR', name: 'Maldivian Rufiyaa' }, // Maldives
  'MW': { code: 'MWK', name: 'Malawian Kwacha' }, // Malawi
  'MX': { code: 'MXN', name: 'Mexican Peso' }, // Mexico
  'MY': { code: 'MYR', name: 'Malaysian Ringgit' }, // Malaysia
  'MZ': { code: 'MZN', name: 'Mozambican Metical' }, // Mozambique
  
  // N
  'NA': { code: 'NAD', name: 'Namibian Dollar' }, // Namibia
  'NC': { code: 'XPF', name: 'CFP Franc' }, // New Caledonia
  'NE': { code: 'XOF', name: 'West African CFA Franc' }, // Niger
  'NF': { code: 'AUD', name: 'Australian Dollar' }, // Norfolk Island
  'NG': { code: 'NGN', name: 'Nigerian Naira' }, // Nigeria
  'NI': { code: 'NIO', name: 'Nicaraguan Córdoba' }, // Nicaragua
  'NL': { code: 'EUR', name: 'Euro' }, // Netherlands
  'NO': { code: 'NOK', name: 'Norwegian Krone' }, // Norway
  'NP': { code: 'NPR', name: 'Nepalese Rupee' }, // Nepal
  'NR': { code: 'AUD', name: 'Australian Dollar' }, // Nauru
  'NU': { code: 'NZD', name: 'New Zealand Dollar' }, // Niue
  'NZ': { code: 'NZD', name: 'New Zealand Dollar' }, // New Zealand
  
  // O
  'OM': { code: 'OMR', name: 'Omani Rial' }, // Oman
  
  // P
  'PA': { code: 'PAB', name: 'Panamanian Balboa' }, // Panama
  'PE': { code: 'PEN', name: 'Peruvian Sol' }, // Peru
  'PF': { code: 'XPF', name: 'CFP Franc' }, // French Polynesia
  'PG': { code: 'PGK', name: 'Papua New Guinean Kina' }, // Papua New Guinea
  'PH': { code: 'PHP', name: 'Philippine Peso' }, // Philippines
  'PK': { code: 'PKR', name: 'Pakistani Rupee' }, // Pakistan
  'PL': { code: 'PLN', name: 'Polish Zloty' }, // Poland
  'PM': { code: 'EUR', name: 'Euro' }, // Saint Pierre and Miquelon
  'PN': { code: 'NZD', name: 'New Zealand Dollar' }, // Pitcairn
  'PR': { code: 'USD', name: 'US Dollar' }, // Puerto Rico
  'PS': { code: 'ILS', name: 'Israeli New Sheqel' }, // Palestine
  'PT': { code: 'EUR', name: 'Euro' }, // Portugal
  'PW': { code: 'USD', name: 'US Dollar' }, // Palau
  'PY': { code: 'PYG', name: 'Paraguayan Guarani' }, // Paraguay
  
  // Q
  'QA': { code: 'QAR', name: 'Qatari Rial' }, // Qatar
  
  // R
  'RE': { code: 'EUR', name: 'Euro' }, // Réunion
  'RO': { code: 'RON', name: 'Romanian Leu' }, // Romania
  'RS': { code: 'RSD', name: 'Serbian Dinar' }, // Serbia
  'RU': { code: 'RUB', name: 'Russian Ruble' }, // Russia
  'RW': { code: 'RWF', name: 'Rwandan Franc' }, // Rwanda
  
  // S
  'SA': { code: 'SAR', name: 'Saudi Riyal' }, // Saudi Arabia
  'SB': { code: 'SBD', name: 'Solomon Islands Dollar' }, // Solomon Islands
  'SC': { code: 'SCR', name: 'Seychellois Rupee' }, // Seychelles
  'SD': { code: 'SDG', name: 'Sudanese Pound' }, // Sudan
  'SE': { code: 'SEK', name: 'Swedish Krona' }, // Sweden
  'SG': { code: 'SGD', name: 'Singapore Dollar' }, // Singapore
  'SH': { code: 'SHP', name: 'Saint Helena Pound' }, // Saint Helena
  'SI': { code: 'EUR', name: 'Euro' }, // Slovenia
  'SJ': { code: 'NOK', name: 'Norwegian Krone' }, // Svalbard and Jan Mayen
  'SK': { code: 'EUR', name: 'Euro' }, // Slovakia
  'SL': { code: 'SLL', name: 'Sierra Leonean Leone' }, // Sierra Leone
  'SM': { code: 'EUR', name: 'Euro' }, // San Marino
  'SN': { code: 'XOF', name: 'West African CFA Franc' }, // Senegal
  'SO': { code: 'SOS', name: 'Somali Shilling' }, // Somalia
  'SR': { code: 'SRD', name: 'Surinamese Dollar' }, // Suriname
  'SS': { code: 'SSP', name: 'South Sudanese Pound' }, // South Sudan
  'ST': { code: 'STN', name: 'São Tomé and Príncipe Dobra' }, // São Tomé and Príncipe
  'SV': { code: 'USD', name: 'US Dollar' }, // El Salvador
  'SX': { code: 'ANG', name: 'Netherlands Antillean Guilder' }, // Sint Maarten
  'SY': { code: 'SYP', name: 'Syrian Pound' }, // Syria
  'SZ': { code: 'SZL', name: 'Swazi Lilangeni' }, // Eswatini
  
  // T
  'TC': { code: 'USD', name: 'US Dollar' }, // Turks and Caicos Islands
  'TD': { code: 'XAF', name: 'Central African CFA Franc' }, // Chad
  'TF': { code: 'EUR', name: 'Euro' }, // French Southern Territories
  'TG': { code: 'XOF', name: 'West African CFA Franc' }, // Togo
  'TH': { code: 'THB', name: 'Thai Baht' }, // Thailand
  'TJ': { code: 'TJS', name: 'Tajikistani Somoni' }, // Tajikistan
  'TK': { code: 'NZD', name: 'New Zealand Dollar' }, // Tokelau
  'TL': { code: 'USD', name: 'US Dollar' }, // Timor-Leste
  'TM': { code: 'TMT', name: 'Turkmenistani Manat' }, // Turkmenistan
  'TN': { code: 'TND', name: 'Tunisian Dinar' }, // Tunisia
  'TO': { code: 'TOP', name: 'Tongan Paʻanga' }, // Tonga
  'TR': { code: 'TRY', name: 'Turkish Lira' }, // Turkey
  'TT': { code: 'TTD', name: 'Trinidad and Tobago Dollar' }, // Trinidad and Tobago
  'TV': { code: 'AUD', name: 'Australian Dollar' }, // Tuvalu
  'TW': { code: 'TWD', name: 'New Taiwan Dollar' }, // Taiwan
  'TZ': { code: 'TZS', name: 'Tanzanian Shilling' }, // Tanzania
  
  // U
  'UA': { code: 'UAH', name: 'Ukrainian Hryvnia' }, // Ukraine
  'UG': { code: 'UGX', name: 'Ugandan Shilling' }, // Uganda
  'UM': { code: 'USD', name: 'US Dollar' }, // U.S. Outlying Islands
  'US': { code: 'USD', name: 'US Dollar' }, // United States
  'UY': { code: 'UYU', name: 'Uruguayan Peso' }, // Uruguay
  'UZ': { code: 'UZS', name: 'Uzbekistani Som' }, // Uzbekistan
  
  // V
  'VA': { code: 'EUR', name: 'Euro' }, // Vatican City
  'VC': { code: 'XCD', name: 'East Caribbean Dollar' }, // Saint Vincent and the Grenadines
  'VE': { code: 'VES', name: 'Venezuelan Bolívar Soberano' }, // Venezuela
  'VG': { code: 'USD', name: 'US Dollar' }, // British Virgin Islands
  'VI': { code: 'USD', name: 'US Dollar' }, // U.S. Virgin Islands
  'VN': { code: 'VND', name: 'Vietnamese Dong' }, // Vietnam
  'VU': { code: 'VUV', name: 'Vanuatu Vatu' }, // Vanuatu
  
  // W
  'WF': { code: 'XPF', name: 'CFP Franc' }, // Wallis and Futuna
  'WS': { code: 'WST', name: 'Samoan Tala' }, // Samoa
  
  // Y
  'YE': { code: 'YER', name: 'Yemeni Rial' }, // Yemen
  'YT': { code: 'EUR', name: 'Euro' }, // Mayotte
  
  // Z
  'ZA': { code: 'ZAR', name: 'South African Rand' }, // South Africa
  'ZM': { code: 'ZMW', name: 'Zambian Kwacha' }, // Zambia
  'ZW': { code: 'ZWL', name: 'Zimbabwean Dollar' }, // Zimbabwe
};

export function getCurrencyByCountryCode(countryCode: string): { code: string; name: string } {
  return COUNTRY_TO_CURRENCY[countryCode.toUpperCase()] || { code: 'USD', name: 'US Dollar' };
}

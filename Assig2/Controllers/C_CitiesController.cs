using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Assig2.Data;
using Assig2.Models;

namespace Assig2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class C_CitiesController : ControllerBase
    {
        private readonly EnvDataContext _context;

        public C_CitiesController(EnvDataContext context)
        {
            _context = context;
        }


        /// <summary>
        /// Gets a list of Cities for a specific country, ordered by CityName with optional search
        /// </summary>
        /// <param name="countryId">The Selected countryId</param>
        /// <param name="searchText">Optional: Search Text the CityName starts with</param>
        /// <returns>A list of Cities within the selected country, air-quality data count and year range of available data</returns>
        // GET: api/C_Cities/5
        [HttpGet("{countryId}", Name = "Get Country Cities")]
        public async Task<ActionResult<CityListDetail>> GetCity(int countryId, string? searchText)
        {
            if (_context.Cities == null)
            {
                return NotFound();
            }
            if (countryId == 0)
            {
                return BadRequest();
            }
            var query = _context.Cities
                .Where(c => c.CountryId == countryId)
                .Select(c => new CityListDetail
                {
                    CityID = c.CityId,
                    CityName = c.CityName,
                    RecordCount = c.AirQualityData.Count(),
                    AirQualityYearRange = new[]
                    {
                     c.AirQualityData.Any() ? c.AirQualityData.Min(td => td.Year) : 0,
                     c.AirQualityData.Any() ? c.AirQualityData.Max(td => td.Year) : 0
                    },
                });

            if (!string.IsNullOrWhiteSpace(searchText))
            {
                query = query.Where(c => c.CityName.StartsWith(searchText));
            }
            query = query.OrderBy(c => c.CityName);
            return Ok(await query.ToListAsync());
        }

        /// <summary>
        /// Gets a list of Air Quality Data for the selected City and general summary for the Country
        /// </summary>
        /// <param name="cityId">The Selected CityId</param>
        /// <returns>The City, Country and Region Detail as well as Air Quality Data with Country averages</returns>
        // GET api/C_Cities/GetAirQualityData/{cityId}
        [HttpGet("GetAirQualityData/{cityId}", Name = "Get City Air Quality Data")]
        public async Task<ActionResult<CityAirQualityData>> GetAirQualityData(int cityId)
        {
            var caqd = new CityAirQualityData(); // return object of this action

            if (_context.Cities == null)
            {
                return NotFound();
            }
            var cd = await _context.Cities
                .Where(c => c.CityId == cityId)
                .Select(c => new CityDetail
                {
                    CityId = c.CityId,
                    CityName = c.CityName,
                    CountryName = c.Country.CountryName,
                    CountryID = c.CountryId,
                    ImageUrl = c.Country.ImageUrl,
                    iso3 = c.Country.Iso3,
                    regionId = c.Country.RegionId,
                    regionName = c.Country.Region != null ? c.Country.Region.RegionName : null

                }).FirstOrDefaultAsync();

            if (cd == null)
            {
                return NotFound();
            }

            caqd.TheCityDetail = cd;



            var query = _context.AirQualityData
                    .Where(aqd => aqd.CityId == cityId)
                    .Select(aqd => new CityAirQualityDetail
                    {
                        TheAirQualityData = aqd,
                        DataStationDetail = aqd.AirQualityStations.Select(aqs => new CityStationDetail
                        {
                            StationType = aqs.StationType.StationType,
                            StationNumber = aqs.Number
                        }).ToList()
                    });

            var CountryData = _context.AirQualityData
                 .Where(aqd => query.Any(q => q.TheAirQualityData != null &&
                         q.TheAirQualityData.City.Country.Cities.Select(c => c.CityId).Contains(aqd.CityId))
                         )
                 .GroupBy(td2 => td2.Year)
                 .Select(group => new
                 {
                     Year = group.Key,
                     CountryPM10Avg = group.Select(td2 => td2.AnnualMean).DefaultIfEmpty().Average(),
                     CountryPM10Min = group.Select(td2 => td2.AnnualMean).DefaultIfEmpty().Min(),
                     CountryPM10Max = group.Select(td2 => td2.AnnualMean).DefaultIfEmpty().Max(),
                     CountryPM25Avg = group.Select(td2 => td2.AnnualMeanUgm3).DefaultIfEmpty().Average(),
                     CountryPM25Min = group.Select(td2 => td2.AnnualMeanUgm3).DefaultIfEmpty().Min(),
                     CountryPM25Max = group.Select(td2 => td2.AnnualMeanUgm3).DefaultIfEmpty().Max()

                 })
                .ToDictionary(group => group.Year, group => new
                {
                    CountryPM10Avg = group.CountryPM10Avg,
                    CountryPM10Min = group.CountryPM10Min,
                    CountryPM10Max = group.CountryPM10Max,
                    CountryPM25Avg = group.CountryPM25Avg,
                    CountryPM25Min = group.CountryPM25Min,
                    CountryPM25Max = group.CountryPM25Max,
                });



            caqd.TheCityAirQualityData = await query.Select(q => q).ToListAsync();

            foreach (var item in caqd.TheCityAirQualityData)
            {
                if (CountryData.ContainsKey(item.TheAirQualityData.Year))
                {
                    var countryDataForYear = CountryData[item.TheAirQualityData.Year];
                    item.Year = item.TheAirQualityData.Year;
                    item.CountryPM10Avg = countryDataForYear.CountryPM10Avg;
                    item.CountryPM10Min = countryDataForYear.CountryPM10Min;
                    item.CountryPM10Max = countryDataForYear.CountryPM10Max;
                    item.CountryPM25Avg = countryDataForYear.CountryPM25Avg;
                    item.CountryPM25Min = countryDataForYear.CountryPM25Min;
                    item.CountryPM25Max = countryDataForYear.CountryPM25Max;
                }
            }

            return caqd;
        }

        /// <summary>
        /// Gets the region information for a country
        /// </summary>
        /// <param name="countryId">The country ID to get region information for</param>
        /// <returns>Region information for the specified country</returns>
        // GET: api/C_Cities/country/{countryId}/region
        [HttpGet("country/{countryId}/region")]
        public async Task<ActionResult<object>> GetCountryRegion(int countryId)
        {
            if (_context.Countries == null)
            {
                return NotFound();
            }

            var country = await _context.Countries
                .Include(c => c.Region)
                .FirstOrDefaultAsync(c => c.CountryId == countryId);

            if (country == null)
            {
                return NotFound();
            }

            if (country.Region == null)
            {
                return NotFound("No region found for this country");
            }

            return new 
            {
                regionId = country.Region.RegionId,
                regionName = country.Region.RegionName,
                imageUrl = country.Region.ImageUrl
            };
        }

    }

}

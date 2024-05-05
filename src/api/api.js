const myHeaders = new Headers()
myHeaders.append("Content-Type", "application/json")

export async function fetchJobData({limit, offset, filters}) {
    const body = JSON.stringify({
        "limit": limit,
        "offset": offset,
        "filters": filters
    })

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body
    }
    const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
    const result = await response.json();
    return result.jdList;
}
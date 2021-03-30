# PogPoints

<img src="images/thumbnail.png" alt="PogPoints thumbnail" width="200" />

PogPoints is a Twitch Channel Points integration that allows you to run draws and giveaways (PogPrizes) on your stream for new ways to interact with and engage with your audience. Viewers redeem channel points for tickets and streamers use the PogPoints desktop application to manage and showcase PogPrizes on their streams.

[Video Demo](https://www.youtube.com/watch?v=EZ6QlZPxbUM)

## Running the repo

### Downloading the source code

#### Clone the repository:

```
git clone https://github.com/uyxela/pogpoints
cd pogpoints
```

#### To run PogPoints locally:

```
cd application
yarn
yarn start
```

## Features + Demos

PogPoints is an application that integrates with the Twitch Channel Points API to allow streamers to run draws or giveaways (PogPrizes).

![dashboard-2](https://github.com/uyxela/pogpoints/blob/main/images/dashboard-2.png)

A streamer can start a PogPrize within the desktop app, which will use the API to automatically create a custom reward, a single ticket entry for the draw.

![pogprize](https://github.com/uyxela/pogpoints/blob/main/images/pogprize-4.png)

The application displays the information about the PogPrize, a countdown timer until the end of the giveaway, the total number of points spent by viewers, and a list of all the entries that have been made so far.

![pogprizeprogress](https://res.cloudinary.com/devpost/image/fetch/s--bkUQNFj6--/c_limit,f_auto,fl_lossy,q_auto:eco,w_900/https://github.com/uyxela/pogpoints/blob/main/images/pogprize-4.png%3Fraw%3Dtrue)

Upon ending the PogPrize, winners will be randomly selected from the entries and the custom reward will be deleted. An unfulfilled prize is added to the streamer's queue which is shown on the dashboard and stored in the database.

There are several windows that can be opened to display on the broadcast as sources for streaming software like OBS.
<table>
  <tr>
    <td><img src="https://github.com/uyxela/pogpoints/blob/main/images/window-entries.png" width=270 ></td>
    <td><img src="https://github.com/uyxela/pogpoints/blob/main/images/window-info.png" width=270 ></td>
    <td><img src="https://github.com/uyxela/pogpoints/blob/main/images/window-queue.png" width=270 ></td>
  </tr>
 </table>



## Contributors to PogPoints

- [Alex Yu](https://github.com/uyxela)
- [Aryan Misra](https://github.com/aryanmisra/)

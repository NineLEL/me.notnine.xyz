class DiscordIntegration {
  constructor(options = {}) {
    this.discordUserId = options.discordUserId;
    this.discordConnectEnabled = options.discordConnectEnabled ?? true;
    this.statusIndicator = options.statusIndicator;
    this.avatarImage = options.avatarImage;
    this.activityContainer = options.activityContainer;
    this.updateInterval = options.updateInterval ?? 30000;
    this.progressInterval = null;
    this.intervalId = null;
  }

  init() {
    if (!this.discordConnectEnabled) {
      this.setDisabledState();
      return;
    }

    this.fetchDiscordData();
    this.intervalId = setInterval(() => {
      this.fetchDiscordData();
    }, this.updateInterval);
  }

  destroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
  }

  setDisabledState() {
    if (this.statusIndicator) {
      this.statusIndicator.className = this.statusIndicator.className.replace(
        /bg-\w+-\d+/,
        "bg-gray-400"
      );
      this.statusIndicator.title = "Discord integration disabled";
    }

    if (this.activityContainer) {
      this.activityContainer.innerHTML = `
                <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span>Discord integration disabled</span>
                </div>
              `;
    }
  }

  async fetchDiscordData() {
    if (!this.discordConnectEnabled) return;

    try {
      const apiUrl = `https://api.lanyard.rest/v1/users/${this.discordUserId}`;
      const response = await fetch(apiUrl);

      if (!response.ok) throw new Error("API request failed");

      const data = await response.json();
      const discordStatus = data.data?.discord_status || "offline";
      const activities = data.data?.activities || [];
      const avatar = data.data?.discord_user?.avatar;

      if (avatar && this.avatarImage) {
        const avatarUrl = `https://cdn.discordapp.com/avatars/${this.discordUserId}/${avatar}.png?size=128`;
        this.avatarImage.src = avatarUrl;
      }

      this.updateStatusIndicator(discordStatus, activities);
      this.updateActivityDisplay(activities);
    } catch (error) {
      console.error("Failed to fetch Discord data:", error);
      this.handleError();
    }
  }

  updateStatusIndicator(status, activities) {
    if (!this.statusIndicator) return;

    const statusColors = {
      online: "bg-green-500",
      idle: "bg-yellow-500",
      dnd: "bg-red-500",
      offline: "bg-gray-500",
      disabled: "bg-gray-400",
    };

    const colorClass = statusColors[status] || statusColors.offline;
    this.statusIndicator.className = this.statusIndicator.className.replace(
      /bg-\w+-\d+/,
      colorClass
    );

    let tooltip = `Discord: ${
      status.charAt(0).toUpperCase() + status.slice(1)
    }`;
    const playingActivity = activities.find((activity) => activity.type === 0);
    if (playingActivity) {
      tooltip += ` - Playing ${playingActivity.name}`;
    }
    this.statusIndicator.title = tooltip;
  }

  updateActivityDisplay(activities) {
    if (!this.activityContainer) return;

    const displayActivities = activities.filter(
      (activity) => activity.type !== 4
    );

    if (displayActivities.length === 0) {
      this.showNoActivity();
      return;
    }

    const spotifyActivity = displayActivities.find(
      (activity) => activity.name === "Spotify"
    );

    if (spotifyActivity) {
      this.showSpotifyActivity(spotifyActivity);
    } else {
      this.showRegularActivities(displayActivities);
    }
  }

  showSpotifyActivity(activity) {
    const spotifyData = activity.spotify;
    let albumArt = null;

    if (spotifyData?.album_art_url) {
      albumArt = spotifyData.album_art_url;
    } else if (activity.assets?.large_image) {
      const assetImage = activity.assets.large_image;
      if (assetImage.startsWith("spotify:")) {
        albumArt = `https://i.scdn.co/image/${assetImage.replace(
          "spotify:",
          ""
        )}`;
      } else if (assetImage.startsWith("http")) {
        albumArt = assetImage;
      } else {
        albumArt = `https://cdn.discordapp.com/${assetImage}`;
      }
    }

    const trackName = spotifyData?.song || activity.details || "Unknown Track";
    const artistName =
      spotifyData?.artist || activity.state || "Unknown Artist";

    const spotifyHtml = `
              <div class="spotify-activity bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-3 border border-green-200 dark:border-green-700">
                <div class="flex items-start gap-3">
                  <div class="flex-shrink-0">
                    ${
                      albumArt && albumArt.trim() !== ""
                        ? `
                      <img
                        src="${albumArt}"
                        alt="Album Art"
                        class="w-16 h-16 rounded-lg shadow-sm object-cover"
                        crossorigin="anonymous"
                        loading="lazy"
                        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                      />
                      <div class="w-16 h-16 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-2xl" style="display: none;">
                        <span>🎵</span>
                      </div>
                    `
                        : `
                      <div class="w-16 h-16 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-2xl">
                        <span>🎵</span>
                      </div>
                    `
                    }
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-2">
                      <span class="text-green-600 dark:text-green-400 text-sm font-semibold">Spotify</span>
                      <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    <div class="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-tight mb-1">
                      ${trackName}
                    </div>
                    <div class="text-xs text-gray-600 dark:text-gray-400 mb-3">
                      ${artistName}
                    </div>
                    <div class="progress-container">
                      <div class="progress-bar bg-gray-200 dark:bg-gray-700">
                        <div class="progress-fill bg-gradient-to-r from-green-500 to-green-400"></div>
                      </div>
                      <div class="progress-time">
                        <span class="current-time text-gray-600 dark:text-gray-300">0:00</span>
                        <span class="separator text-gray-400">/</span>
                        <span class="total-time text-gray-600 dark:text-gray-300">0:00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `;

    this.activityContainer.innerHTML = spotifyHtml;

    if (spotifyData?.timestamps) {
      this.startProgressTracking({
        ...activity,
        timestamps: {
          start: spotifyData.timestamps.start,
          end: spotifyData.timestamps.end,
        },
      });
    } else {
      this.startProgressTracking(activity);
    }
  }

  showRegularActivities(activities) {
    const activityIcons = {
      0: "🎮",
      1: "🎥",
      2: "🎵",
      3: "📺",
      4: "💬",
      5: "🏆",
    };
    const activityLabels = {
      0: "Playing",
      1: "Streaming",
      2: "Listening to",
      3: "Watching",
      4: "Status",
      5: "Competing in",
    };

    const activityHtml = activities
      .map((activity) => {
        const icon = activityIcons[activity.type] || "🎯";
        const label = activityLabels[activity.type] || "Activity";
        let text = activity.name;

        if (activity.details) {
          text += ` - ${activity.details}`;
        }
        if (activity.state && activity.state !== activity.details) {
          text += ` (${activity.state})`;
        }

        return `
                  <div class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                    <span class="text-base">${icon}</span>
                    <span><strong>${label}</strong> ${text}</span>
                  </div>
                `;
      })
      .join("");

    this.activityContainer.innerHTML = activityHtml;
    this.stopProgressTracking();
  }

  showNoActivity() {
    this.activityContainer.innerHTML = `
              <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span>No activity</span>
              </div>
            `;
    this.stopProgressTracking();
  }

  startProgressTracking(activity) {
    this.stopProgressTracking();

    const timestamps = activity.timestamps;
    if (!timestamps?.start || !timestamps?.end) return;

    const updateProgress = () => {
      const now = Date.now();
      const startTime = timestamps.start;
      const endTime = timestamps.end;
      const totalDuration = endTime - startTime;
      const elapsed = now - startTime;

      if (elapsed >= totalDuration) {
        this.stopProgressTracking();
        this.fetchDiscordData();
        return;
      }

      const progress = Math.min(elapsed / totalDuration, 1);
      const progressFill =
        this.activityContainer.querySelector(".progress-fill");
      const currentTimeEl =
        this.activityContainer.querySelector(".current-time");
      const totalTimeEl = this.activityContainer.querySelector(".total-time");

      if (progressFill) {
        progressFill.style.width = `${progress * 100}%`;
      }

      if (currentTimeEl && totalTimeEl) {
        currentTimeEl.textContent = this.formatTime(elapsed / 1000);
        totalTimeEl.textContent = this.formatTime(totalDuration / 1000);
      }
    };

    updateProgress();
    this.progressInterval = setInterval(updateProgress, 1000);
  }

  stopProgressTracking() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
  }

  formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  handleError() {
    if (this.statusIndicator) {
      this.statusIndicator.className = this.statusIndicator.className.replace(
        /bg-\w+-\d+/,
        "bg-gray-500"
      );
      this.statusIndicator.title = "Discord: Offline";
    }

    if (this.activityContainer) {
      this.activityContainer.innerHTML = `
                <div class="flex items-center gap-2 text-sm text-red-500 dark:text-red-400">
                  <div class="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Unable to load activity</span>
                </div>
              `;
    }

    this.stopProgressTracking();
  }
}

export function initDiscordIntegration(discordUserId, discordConnectEnabled) {
  document.addEventListener("DOMContentLoaded", () => {
    const statusIndicator = document.getElementById("status-indicator");
    const avatarImage = document.querySelector('[data-slot="avatar-image"]');
    const activityContainer = document.getElementById("activity-container");

    if (!statusIndicator || !activityContainer) return;

    const actualAvatarImage = document.querySelector(
      'img[alt="Profile Picture"]'
    );

    const discordIntegration = new DiscordIntegration({
      discordUserId,
      discordConnectEnabled,
      statusIndicator,
      avatarImage: actualAvatarImage,
      activityContainer,
    });

    discordIntegration.init();
    window.discordIntegration = discordIntegration;
  });
}

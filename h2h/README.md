- [H2H Designs](#h2h-designs)
  - [Pages](#pages)
    - [Download page](#download-page)
    - [History downloads page](#history-downloads-page)
    - [About page](#about-page)
  - [Data](#data)
    - [URL type](#url-type)
    - [Folder structure](#folder-structure)
    - [Data structure](#data-structure)
  - [Constants](#constants)
  - [Workflow](#workflow)

# H2H Designs

Highway to Hell.

## Pages

global widgets:

- [ ] menubar
- [ ] config sidebar

pages:

- [ ] home page (?)
- [ ] Download page
- [ ] History downloads page
- [ ] About page

### Download page

<details>
  <summary>design</summary>

```yaml
Page Name: Download Page
Purpose: Download videos or audios from given URLs.
Page Overview: Accept an URL as input,
  fetch and display information of the URL,
  provide download options,
  and monitor & control the download progress.

Components:
  - URL Input Field:
      - Purpose: Accept user input for the URL of the video to be downloaded.
      - Layout: Positioned at the top of the page.
      - Functionality: Accept an URL as input, and do validation.

  - Parse Button:
      - Purpose: Parse the URL and fetch information about the video.
      - Layout: Positioned at the right of the URL Input Field.
      - Functionality: Start the information fetching.

  - Video Information Section:
      - Purpose: Display video information.
      - Layout: Positioned below the URL Input Field.

  - Download Options Section:
      - Purpose: Provide video/audio options for the user to customize the download process.
      - Layout: Positioned below the URL Information Section.
      - Functionality: Allows users to choose the desired download options, such as selecting a specific format or quality.

  - Download Progress Bar:
      - Purpose: Display the progress of the download.
      - Layout: Positioned below the Download Options Section.
      - Functionality: Visual representation of the download progress, updated in real-time.

  - Download Controls:
      - Purpose: Provide controls to start / pause / resume, and cancel the download.
      - Layout: Positioned at the right of the Download Progress Bar.
      - Functionality: Allows users to control the download process, including starting, pausing, resuming, and canceling the download.

Interaction and Navigation:
  - User enters the URL in the input field.
  - After fetch button is pressed, URL information is fetched and displayed dynamically. Show error message if the URL is invalid.
  - User selects download options, if applicable.
  - User initiates the download.
  - Download progress is displayed and updated in real-time.
  - User can control the download process using the provided controls.

Design Assets:
  - Fetch icon:
  - Config icon:
  - Folder icon:
  - Download icon:
  - Pause icon:
  - Resume icon:
  - Cancel icon:

Annotations and Notes:
  - The download progress bar should indicate the percentage of completion.
  - Consider adding tooltips or help text to guide users through the download process.
  - Ensure the design is responsive and works well on different screen sizes.
```

</details>

### History downloads page

<details>
  <summary>design</summary>

```yaml
Page Name: History Downloads Page
Purpose: Display a history of downloaded videos/audios, including details such as file name, date, and download status.

Components:
  - Download History List:
      - Purpose: Display a list of downloaded files in chronological order.
      - Layout: Positioned at the top of the page or in the main content area.
      - Functionality: Shows the file name, download date, and download status for each entry.

  - File Details:
      - Purpose: Show additional details of a selected file from the download history.
      - Layout: Positioned alongside or below the Download History List.
      - Functionality: Provides more information about a specific file, such as file size, file type, and location.

  - File Actions:
      - Purpose: Provide actions or options related to the downloaded file.
      - Layout: Positioned alongside or below the File Details section.
      - Functionality: Allows users to perform actions like opening the file, deleting it, or sharing it.

  - Search or Filter:
      - Purpose: Enable users to search for specific files or filter the download history based on criteria like date or file name.
      - Layout: Positioned at the top or in a sidebar of the Download History page.
      - Functionality: Offers a search input field or filter options to refine the displayed download history.

Interaction and Navigation:
  - Users can scroll through the Download History List to view their past downloads.
  - Clicking on a specific entry in the list expands the File Details section to display additional information.
  - Users can perform actions on a downloaded file using the provided File Actions, such as opening, deleting, or sharing the file.
  - The search or filter feature allows users to search for specific files or narrow down the download history based on criteria.

Design Assets:
  - Download icon: [Path to the download icon file]
  - File icon: [Path to the file icon file]
  - Delete icon: [Path to the delete icon file]
  - Share icon: [Path to the share icon file]

Annotations and Notes:
  - Ensure the design presents the download history in a clear and easily scannable format.
  - Consider using pagination or infinite scrolling if there is a large number of download history entries.
  - Provide visual indicators or color coding to represent different download statuses (completed, in progress, failed).
  - Include options for sorting the download history list by date, file name, or other relevant criteria.
  - Make sure the design is responsive and works well on different screen sizes.
```

</details>

### About page

<details>
  <summary>design</summary>

```yaml
Page Name: About Page
Purpose: Provide information about the app, its creators, and its purpose.

Components:
  - App Logo:
      - Layout: Positioned at the top of the page.
  - App Name and Description:
      - Layout: Positioned below the App Logo.
  - App Features:
      - Purpose: Highlight the key features and functionalities of the app.
      - Layout: Positioned below the App Name and Description.
      - Functionality: Describes the main capabilities and benefits of the app.
  - Team Section:
      - Purpose: Introduce the team members or creators behind the app.
      - Layout: Positioned below the App Features.
      - Functionality: Provides information about the team members, their roles, and their expertise.
  - Contact Information:
      - Purpose: Display contact details for users to get in touch with the app's creators or support team.
      - Layout: Positioned below the Team Section.
      - Functionality: Includes email addresses, social media links, or a contact form for communication.

Interaction and Navigation:
  - Users can scroll through the content of the About page to access different sections.
  - Users can click on social media links or email addresses to initiate communication.

Design Assets:
  - App logo:
  - Author photo:

Annotations and Notes:
  - Ensure the design reflects the branding and visual identity of the app.
  - Use clear and concise language to communicate the app's purpose and benefits.
  - Consider adding testimonials or customer quotes to reinforce the app's value.
  - Incorporate visually appealing design elements and typography to enhance the overall user experience.
```

</details>

## Data

### URL type

- video:
  - https://youtu.be/0rVIEj7zgOo
  - https://www.youtube.com/watch?v=0rVIEj7zgOo
- playlist:
  - https://youtu.be/0rVIEj7zgOo?list=PLxA687tYuMWhSohOX_uDBZl_RZVWCCmG8
  - https://www.youtube.com/watch?v=0rVIEj7zgOo&list=PLxA687tYuMWhSohOX_uDBZl_RZVWCCmG8
  - https://www.youtube.com/playlist?list=PLxA687tYuMWhSohOX_uDBZl_RZVWCCmG8

### Folder structure

- config files
  - app config: `{AppConfig}/h2h_config.yml`
  - download configs:
    - base config: `{AppConfig}/download_configs/default_config.yml`
    - custom configs: `{AppConfig}/download_configs/{ConfigName}.yml`
- history file
  - index: `{AppData}/history/index.yml`
  - urls: `{AppData}/history/{LinkID}.yml`

### Data structure

- app config
- download config
- history index
  ```yml
  - id: string # uuid
    link: string # video link
    title: string # video title
    thumbnail: string # video thumbnail (local)
    duration: number # video duration (in seconds)
    createdAt: string # timestamp when the link first parsed
    updatedAt: string # timestamp when the link lastly parsed
  ```
- history
  ```yml
  id: string # uuid
  data: object # result of `--dump-json`
  ```

## Constants

- [ ] translations
- [ ] messages

## Workflow

1. enter link & click parse button
2. extract link `id` & `playlist_id`
3. if `playlist_id` is not null, extract all video info
4. else if `id` is not null, extract video info
5. else, report error in given link

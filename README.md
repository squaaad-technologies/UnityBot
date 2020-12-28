<<<<<<< HEAD
# UnityBot
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/squaaad-technologies/UnityBot/commit-activity)
[![Analytics](https://ga-beacon.appspot.com/G-4DCT4RPNT0/github.com/squaaad-technologies/UnityBot)](https://GitHub.com/squaaad-technologies/UnityBot/)

[![HitCount](http://hits.dwyl.com/squaaad-technologies/UnityBot.svg)](http://hits.dwyl.com/squaaad-technologies/UnityBot)

[![forthebadge](https://forthebadge.com/images/badges/uses-js.svg)](https://forthebadge.com)

UnityBot is an up-and-coming all purpose discord bot built on discord.js/commando!

## Implements

- [tnai](https://tnai.ml)
- [pronoundb.org](https://pronoundb.org)

## Table of Contents

### Commands

[Moderation Commands](#moderation-commands)

[Utility Commands](#utility-commands)

[Fun Commands](#fun-commands)

[Music Commands](#music-commands)

[Settings Commands](#settings-commands)

### Logging

[How to set up Logging (INITIAL DRAFT)](#logging-setup)

[Logging Settings (INITIAL DRAFT)](#logging-settings)

[Advanced Logging Configuration (INITIAL DRAFT)](#logging-advanced)

### Migration

[To make it easier for you... (INITIAL DRAFT)](#migration-introduction)

[From: Carl-Bot (INITIAL DRAFT)](#migration-carlbot)

[From: Reaction Roles (INITIAL DRAFT)](#migration-reactionroles)

[About: PluralKit (INITIAL DRAFT)](#migration-pluralkit)

---

## Moderation Commands

### sq!kick

Kicks a user

Parameters
- User

Will attempt to search for user based on query if one is not expressly mentioned. This is required.

- Reason

Reason for kicking user. Default: `No reason provided.` Not required.

### sq!ban

Bans a user

Required permissions: BAN_MEMBERS

Parameters
- User

Will attempt to search for user based on query if one is not expressly mentioned. This is required.

- Reason

Reason for banning user. Default: `No reason provided.` Not required.

### sq!unban

Unbans a user

Required permissions: BAN_MEMBERS

Parameters
- User

Will attempt to search for user in server's banned list based on query if one is not expressly identified using their UID. This is required.

- Reason

Reason for unbanning user. Default: `No reason provided.` Not required.

### sq!tempban

Temporarily bans a user

Required permissions: BAN_MEMBERS

Parameters
- User

Will attempt to search for user based on query if one is not expressly mentioned. This is required.

- Time

Time to ban the user for. Defaults to `24h`. Not required.

- Reason

Reason for tempbanning user. Default: `No reason provided.` Not required.

### sq!mute

Mutes a user for a given amount of time.

Required permissions: MANAGE_MESSAGES, MANAGE_ROLES

Parameters
- User

Will attempt to search for user based on query if one is not expressly mentioned. This is required.

- Time

Time to mute the user for. Defaults to `indefinite`. Not required.

- Reason

Reason for muting user. Default: `No reason provided.` Not required.

### sq!unmute

Unmutes a user

Required permissions: MANAGE_MESSAGES, MANAGE_ROLES

Parameters
- User

Will attempt to search for user based on query if one is not expressly mentioned. This is required.


- Reason

Reason for muting user. Default: `No reason provided.` Not required.

### sq!strike
=======


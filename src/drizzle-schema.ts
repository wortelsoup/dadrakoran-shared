import { SHOW_TYPES } from './constants';
import { sql } from 'drizzle-orm';
import {
  blob,
  integer,
  text,
  index,
  unique,
  uniqueIndex,
  primaryKey,
  snakeCase,
  sqliteTable,
} from 'drizzle-orm/sqlite-core';
import { v7 as uuidv7 } from 'uuid';

export const ShowFormatTable = sqliteTable(
  'show_formats',
  {
    id: text({ mode: 'text' })
      .primaryKey()
      .notNull()
      .$defaultFn(() => uuidv7()),
    name: text({ mode: 'text' }).notNull(),
    type: text({ mode: 'text', enum: SHOW_TYPES }).notNull(),
  },
  (t) => [unique().on(t.name, t.type)],
);

export type ShowFormatOutput = typeof ShowFormatTable.$inferSelect;

export const ShowDetailTable = sqliteTable(
  'show_details',
  {
    id: text({ mode: 'text' })
      .primaryKey()
      .notNull()
      .$defaultFn(() => uuidv7()),
    title: text({ mode: 'text' }).notNull(),
    slug: text({ mode: 'text' }).unique().notNull(),
    native_title: text({ mode: 'text' }),
    type: text({ mode: 'text', enum: SHOW_TYPES }).notNull(),
    format_id: text({ mode: 'text' })
      .notNull()
      .references(() => ShowFormatTable.id, { onDelete: 'restrict' }),
    status: text({ mode: 'text' }).notNull(),
    cover_image: text({ mode: 'text' }).notNull(),
    synopsis: text({ mode: 'text' }),
    year: integer({ mode: 'number' }).notNull(),
    aired: text({ mode: 'json' }).$type<{ from: string; to: string | null }>().notNull(),
    episodes: integer({ mode: 'number' }),
    websites: text({ mode: 'json' })
      .$type<string[]>()
      .notNull()
      .default(sql`'[]'`),
    is_published: integer({ mode: 'boolean' })
      .notNull()
      .default(sql`0`),
    created_at: integer({ mode: 'timestamp' })
      .notNull()
      .$defaultFn(() => new Date()),
    updated_at: integer({ mode: 'timestamp' })
      .notNull()
      .$defaultFn(() => new Date()),
    // deletedAt: integer({ mode: 'timestamp' }),
  },
  (t) => [
    index('show_details_slug_idx').on(t.slug),
    index('show_details_type_and_is_published_idx').on(t.type, t.is_published),
    index('show_details_format_id_idx').on(t.format_id),
  ],
);

export const ShowAltTitleTable = sqliteTable(
  'show_alternate_titles',
  {
    id: text({ mode: 'text' })
      .primaryKey()
      .notNull()
      .$defaultFn(() => uuidv7()),
    show_id: text({ mode: 'text' })
      .notNull()
      .references(() => ShowDetailTable.id, { onDelete: 'cascade' }),
    title: text({ mode: 'text' }).notNull(),
  },
  (t) => [unique().on(t.show_id, t.title), index('show_alternate_titles_idx').on(t.show_id)],
);

export const GenreTable = sqliteTable(
  'genres',
  {
    id: text({ mode: 'text' })
      .primaryKey()
      .notNull()
      .$defaultFn(() => uuidv7()),
    name: text({ mode: 'text' }).unique().notNull(),
  },
  (t) => [uniqueIndex('genre_idx').on(t.name)],
);

export type Genre = typeof GenreTable.$inferSelect;

export const ShowGenreTable = sqliteTable(
  'show_genres',
  {
    show_id: text()
      .notNull()
      .references(() => ShowDetailTable.id, { onDelete: 'cascade' }),
    genre_id: text()
      .notNull()
      .references(() => GenreTable.id, { onDelete: 'restrict' }),
  },
  (t) => [primaryKey({ columns: [t.show_id, t.genre_id] }), index('show_genres_genre_id_idx').on(t.genre_id)],
);

const PeopleTable = snakeCase.table('peoples', {
  id: text()
    .primaryKey()
    .notNull()
    .$defaultFn(() => uuidv7()),
  name: text().notNull(),
  native_name: text(),
  profile_pic_url: text().notNull(),
  socials: text({ mode: 'json' }).$type<string[]>().notNull().default([]),
  web_ref: text().unique().notNull(),
});

const PeopleShowTable = snakeCase.table(
  'people_show',
  {
    showId: text()
      .notNull()
      .references(() => ShowDetailTable.id, { onDelete: 'cascade' }),
    peopleId: text()
      .notNull()
      .references(() => PeopleTable.id, { onDelete: 'restrict' }),
    role: text().$type<'main' | 'support' | 'guest'>().notNull(),
    appearance: text(),
  },
  (t) => [unique().on(t.showId, t.peopleId, t.role)],
);

const ShowReleaseTable = snakeCase.table('show_releases', {
  id: text()
    .primaryKey()
    .notNull()
    .$defaultFn(() => uuidv7()),
  show_id: text()
    .notNull()
    .references(() => ShowDetailTable.id, { onDelete: 'cascade' }),
  episode: integer(),
  data: blob({ mode: 'buffer' }),
});

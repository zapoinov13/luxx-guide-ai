import { useRef, useState, type PointerEvent } from "react";
import { BedDouble, Check, Images, Layers3, Play, Users, Wifi } from "lucide-react";
import { BookingButton } from "@/components/booking-context";
import { Photo, photoSrc } from "@/components/photo";
import { ROOM_PHOTOS } from "@/lib/photos";
import { ROOM_TYPES } from "@/lib/site";
import "./room-explorer.css";
import { RoomTour } from "./room-tour";

const labels = [
  {
    ru: "Своя капсула",
    en: "Your own capsule",
    hint: "Личное пространство за шторкой",
    hintEn: "A little privacy behind your curtain",
  },
  {
    ru: "Только для вас",
    en: "Just for you",
    hint: "Отдельная комната в вашем ритме",
    hintEn: "A private room at your own pace",
  },
  {
    ru: "Место для двоих",
    en: "Room for two",
    hint: "Вместе в путешествии. Как дома.",
    hintEn: "Travel together. Feel at home.",
  },
];

/** Real room photos in a layered viewer. Perspective is presentation, not a 3D scan. */
export function RoomExplorer({ en = false }: { en?: boolean }) {
  const [selected, setSelected] = useState(2);
  const [angle, setAngle] = useState(0);
  const [video, setVideo] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const scene = useRef<HTMLDivElement>(null);
  const room = ROOM_TYPES[selected]!;
  const label = labels[selected]!;
  const photos = ROOM_PHOTOS[room.slug]!.slice(0, 4);
  const photo = photos[angle] ?? photos[0]!;
  const choose = (index: number) => {
    setSelected(index);
    setAngle(0);
    setVideo(false);
    setVideoError(false);
    resetTilt();
  };
  const resetTilt = () => {
    scene.current?.style.setProperty("--rx", "0deg");
    scene.current?.style.setProperty("--ry", "0deg");
  };
  const tilt = (event: PointerEvent<HTMLDivElement>) => {
    if (
      video ||
      event.pointerType !== "mouse" ||
      !window.matchMedia("(prefers-reduced-motion: no-preference) and (min-width: 900px)").matches
    )
      return;
    const rect = event.currentTarget.getBoundingClientRect();
    scene.current?.style.setProperty(
      "--ry",
      `${((event.clientX - rect.left) / rect.width - 0.5) * 7}deg`,
    );
    scene.current?.style.setProperty(
      "--rx",
      `${(0.5 - (event.clientY - rect.top) / rect.height) * 5}deg`,
    );
  };
  const showPhoto = (index: number) => {
    setAngle(index);
    setVideo(false);
  };

  return (
    <section id="room-explorer" className="room-explorer" aria-labelledby="explorer-title">
      <div className="rx-heading">
        <div>
          <p className="rx-eyebrow">
            <Layers3 size={16} aria-hidden="true" /> LUXX / INSIDE
          </p>
          <h2 id="explorer-title">
            {en ? "Find your space." : "Ваше место."}
            <br />
            <em>{en ? "See it from every angle." : "Рассмотрите поближе."}</em>
          </h2>
        </div>
        <p>
          {en
            ? "Choose a room, explore real photos and make yourself at home before you arrive."
            : "Выберите формат, рассмотрите реальные фотографии и почувствуйте себя дома ещё до приезда."}
        </p>
      </div>

      <div
        className="rx-choices"
        role="group"
        aria-label={en ? "Choose room type" : "Выберите тип номера"}
      >
        {ROOM_TYPES.map((item, index) => (
          <button
            type="button"
            key={item.slug}
            aria-pressed={selected === index}
            onClick={() => choose(index)}
          >
            <Photo photo={ROOM_PHOTOS[item.slug]![0]!} sizes="120px" />
            <span>
              <small>
                0{index + 1} /{" "}
                {en ? `${item.occupancy} guest${item.occupancy > 1 ? "s" : ""}` : item.capacity}
              </small>
              <strong>
                {en
                  ? ["Capsule", "Single", "Double"][index]
                  : ["Капсула", "На одного", "На двоих"][index]}
              </strong>
              <span>
                {index === 1 ? (en ? "from " : "от ") : ""}
                {item.priceValue.toLocaleString(en ? "en-US" : "ru-RU")} ₸
              </span>
            </span>
            <span className="rx-choice-check" aria-hidden="true">
              {selected === index ? <Check size={15} /> : ""}
            </span>
          </button>
        ))}
      </div>

      <div className="rx-layout">
        <div className="rx-gallery">
          <RoomTour key={room.slug} slug={room.slug} en={en} />
          <div className="rx-perspective" onPointerMove={tilt} onPointerLeave={resetTilt}>
            <div className="rx-scene" ref={scene} data-video={video}>
              <div className="rx-back-sheet rx-back-sheet-one" aria-hidden="true" />
              <div className="rx-back-sheet rx-back-sheet-two" aria-hidden="true" />
              <div className="rx-frame">
                {video ? (
                  <video
                    className="rx-main-photo"
                    controls
                    autoPlay
                    playsInline
                    muted
                    preload="none"
                    poster={photoSrc("18")}
                    onError={() => setVideoError(true)}
                    aria-label={
                      en
                        ? "AI room preview, five seconds, no audio"
                        : "AI-визуализация номера, пять секунд, без звука"
                    }
                  >
                    <source src="/luxx-double-preview.mp4" type="video/mp4" />
                  </video>
                ) : (
                  <Photo
                    key={photo.id}
                    photo={photo}
                    className="rx-main-photo"
                    sizes="(min-width: 900px) 65vw, 100vw"
                  />
                )}
                {!video && (
                  <span className="rx-photo-count">
                    <Images size={14} aria-hidden="true" /> {angle + 1} / {photos.length}
                  </span>
                )}
                {!video && (
                  <div className="rx-image-label">
                    <span>LUXX APARTS</span>
                    <strong>{en ? label.en : label.ru}</strong>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            className="rx-filmstrip"
            role="group"
            aria-label={en ? "Room photos" : "Фотографии номера"}
          >
            {photos.map((item, index) => (
              <button
                type="button"
                key={item.id}
                onClick={() => showPhoto(index)}
                aria-pressed={!video && angle === index}
                aria-label={`${en ? "Photo" : "Фото"} ${index + 1}`}
              >
                <Photo photo={item} sizes="120px" />
                <span>0{index + 1}</span>
              </button>
            ))}
          </div>
          <p className="rx-media-note">
            {video
              ? en
                ? "Higgsfield AI animation from a real photo. Not a 360° tour; details may differ."
                : "AI-анимация Higgsfield по реальному фото. Не 360°-тур; детали могут отличаться."
              : en
                ? "Real photos · choose an angle below"
                : "Реальные фотографии · меняйте ракурс под снимком"}
          </p>
          {videoError && (
            <p role="alert" className="rx-media-note">
              {en
                ? "Video could not load. You can still view the room photos."
                : "Видео не загрузилось. Фотографии номера доступны ниже."}
            </p>
          )}
        </div>

        <div className="rx-info" key={room.slug}>
          <span className="rx-room-number" aria-hidden="true">
            0{selected + 1}
          </span>
          <div aria-live="polite" aria-atomic="true">
            <p className="rx-eyebrow">{en ? "YOUR STAY, YOUR WAY" : "ВАШ РИТМ. ВАШ КОМФОРТ."}</p>
            <h3>{en ? label.en : label.ru}</h3>
            <p className="rx-description">{en ? label.hintEn : label.hint}</p>
          </div>
          <ul className="rx-features">
            <li>
              <Users size={18} aria-hidden="true" />
              {en ? `${room.occupancy} guest${room.occupancy > 1 ? "s" : ""}` : room.capacity}
            </li>
            <li>
              <BedDouble size={18} aria-hidden="true" />
              {en
                ? ["Curtained capsule bed", "Private single room", "Private double room"][selected]
                : room.beds}
            </li>
            <li>
              <Wifi size={18} aria-hidden="true" />
              {en ? "Wi-Fi & shared kitchen" : "Wi-Fi и общая кухня"}
            </li>
          </ul>
          <p className="rx-bath-note">{en ? "Shared bathroom on the floor" : room.bath}</p>
          <div className="rx-price">
            <span>
              {selected === 1 ? (en ? "from " : "от ") : ""}
              <strong>{room.priceValue.toLocaleString(en ? "en-US" : "ru-RU")} ₸</strong>
            </span>
            <small>
              {en
                ? selected === 0
                  ? "per bed / night"
                  : "per room / night"
                : selected === 0
                  ? "за место / ночь"
                  : "за номер / ночь"}
            </small>
          </div>
          <BookingButton
            className="rx-book"
            to={en ? "/en/booking" : "/bronirovanie"}
            search={{ room: room.slug }}
          >
            {en ? "Choose dates" : "Выбрать даты"}
          </BookingButton>
          <span className="rx-book-note">
            {en
              ? "No prepayment · availability confirmed by reception"
              : "Без предоплаты · наличие подтвердит администратор"}
          </span>
          {selected === 2 && (
            <button
              type="button"
              className="rx-video-toggle"
              aria-pressed={video}
              onClick={() => {
                setVideo(!video);
                setVideoError(false);
                resetTilt();
              }}
            >
              <Play size={17} aria-hidden="true" />
              {video
                ? en
                  ? "Back to photos"
                  : "Вернуться к фото"
                : en
                  ? "Watch AI preview · 5 sec"
                  : "AI-пролёт по номеру · 5 сек"}
            </button>
          )}
        </div>
      </div>
      <div className="rx-footer">
        <span>
          <Layers3 size={17} aria-hidden="true" />
          {en ? "Explore at your own pace" : "Знакомьтесь в своём темпе"}
        </span>
        <a href={en ? "/en/rooms" : "/foto"}>{en ? "All rooms & details" : "Все 30 фотографий"}</a>
      </div>
    </section>
  );
}

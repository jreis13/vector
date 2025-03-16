export default function EcosystemFeed() {
  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <video
        src="/videos/1.mp4"
        autoPlay
        loop
        muted
        playsInline
        controls
        style={{ width: "80%", borderRadius: "10px" }}
      />

      <div className="w-[100vh]">
        <a
          class="twitter-timeline"
          data-dnt="true"
          data-theme="light"
          href="https://twitter.com/exp_vector?ref_src=twsrc%5Etfw"
          data-chrome="noheader nofooter noborders noscrollbar transparent"
        ></a>{" "}
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charset="utf-8"
        ></script>
      </div>
    </div>
  )
}

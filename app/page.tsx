import VideoEditor from '../components/VideoEditor';

export default function Home() {
  return (
    <div className="container mx-auto p-4 max-w-full">
      <h1 className="text-3xl font-bold mb-4">Video Editing App</h1>
      <VideoEditor />
    </div>
  );
}
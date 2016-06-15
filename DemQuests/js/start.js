class Glitch 
{
	public timeline:TimelineMax;

	private _text:HTMLElement = document.querySelector('.heading');
	private _filter:SVGElement = document.querySelector('.svg-filters');
	private _turb = this._filter.querySelector('#filter feTurbulence');

	private _turbVal = { val: 0.000001 };
  private _turbValX = { val: 0.000001 };

	constructor()
	{
		this.createTimeline();
	}

	private createTimeline():void
	{
		this.timeline = new TimelineMax({
			repeat: -1,
			repeatDelay: 2,
			onUpdate: () => {
				this._turb.setAttribute('baseFrequency', this._turbVal.val + ' ' + this._turbValX.val);
			}
		});
		
		this.timeline.from(this._text, 3, { opacity: 0, scale: .5 });
		
		this.timeline.to(this._turbValX, 0.1, { val: 0.4, ease: Power0.easeNone }, 3);
		this.timeline.to(this._turbVal, 0.1, { val: 0.02 ,ease: Power0.easeNone }, 3);
		
		this.timeline.set(this._turbValX, { val: 0.0, ease: Power0.easeNone });
		this.timeline.set(this._turbVal, { val: 0.0 ,ease: Power0.easeNone });
		
		this.timeline.to(this._turbValX, 0.4, { val: 0.4, ease: Power0.easeNone }, 5);
		this.timeline.to(this._turbVal, 0.4, { val: 0.02 ,ease: Power0.easeNone }, 5);
		
		this.timeline.set(this._turbValX, { val: 0.0, ease: Power0.easeNone });
		this.timeline.set(this._turbVal, { val: 0.0 ,ease: Power0.easeNone });
	}
}

new Glitch();
